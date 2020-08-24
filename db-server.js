// server.js
const jsonServer = require('json-server')
const bodyParser = require('body-parser');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

let totalRequests = 50;

const getNextId = (elements) => {
  return elements.map(e => e.id).sort((a, b) => b - a)[0] + 1;
}

const validEmails = jsonData.users.map((user) => user.email);

const messages = {
  en: {
    USER_DUPLICATE: 'A user with same email address already exists',
    INVALID: 'Invalid credentials',
    UNAUTHORIZED: 'The user is not logged in',
    EXPIRED: 'The session has expired',
  },
  es: {
    USER_DUPLICATE: 'Ya existe un usuario con el mismo correo electronico',
    INVALID: 'Credenciales invalidos',
    UNAUTHORIZED: 'El usuario no esta autenticado',
    EXPIRED: 'La sesion del usuario ha expirado',
  }
}

const mapFeedItemsWithUsers = () => {
  const body = [...jsonData.feeds.map((f) => ({...f}))];
  body.forEach((f) => f.user = jsonData.users.find((u) => u.id === f.creator_user_id))
  body.forEach((f) => {
    f.reactions.forEach((r) => r.user = jsonData.users.find((u) => r.user_id === u.id))
  })
  return body.sort((a, b) => b.updated_date - a.updated_date);
}

// Send expired token after "totalRequests" requests
middlewares.push((req, res, next) => {
  totalRequests--;
  if (totalRequests === 0) {
    totalRequests = 50;
    return res.status(401).send({
      message: messages[req.headers.lang || 'en'].EXPIRED,
    });
  } else {
    next();
  }
});

// Send unauthorized if the authorization header is not present
middlewares.push((req, res, next) => {
  if (req.originalUrl !== '/login' && req.originalUrl !== '/users' && !req.headers.authorization) {
    return res.status(401).send({
      message: messages[req.headers.lang || 'en'].UNAUTHORIZED,
    });
  } else {
    next();
  }
});

// Send expired token after "totalRequests" requests
middlewares.push((req, res, next) => {
  if (req.method === 'POST' && req.originalUrl === '/login') {
    if (validEmails.includes(req.body.email) && req.body.password === 'test') {
      const response = {
        token: 'mycustomtoken',
        user: jsonData.users.find(x => x.email === req.body.email),
      }
      res.json(response);
    } else {
      return res.status(500).send({
        message: messages[req.headers.lang || 'en'].INVALID,
      });
    }
  } else {
    next();
  }
});

middlewares.push((req, res, next) => {
  if (req.method === 'GET' && req.originalUrl === '/feeds/notifications') {
    const notifications = jsonData.notifications.reverse().slice(0, 6);
    notifications.forEach(n => n.user = jsonData.users.find(u => u.id === n.user_id));
    res.json(notifications);
  } else {
    next();
  }
});

middlewares.push((req, res, next) => {
  if (req.method === 'GET' && req.originalUrl === '/feeds') {
    res.json(mapFeedItemsWithUsers());
  } else {
    next();
  }
});

middlewares.push((req, res, next) => {
  if (req.method === 'POST' && req.originalUrl === '/users') {
    const user = {...req.body};
    if (jsonData.users.find(u => u.email === user.email)) {
      res.send(500, { message: messages[req.headers.lang || 'en'].USER_DUPLICATE });
    }
    user.id = getNextId(jsonData.users);
    user.review = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
    user.cover_url = 'https://picsum.photos/800/400';
    user.photo_url = 'https://picsum.photos/200/200?grayscale';
    jsonData.users.push(user);
    res.json({user, token: 'authorization.token'});
  } else {
    next();
  }
});

middlewares.push((req, res, next) => {
  if (req.method === 'POST' && req.originalUrl === '/feeds') {
    const feed = {...req.body};
    jsonData.notifications.push({created_date: Date.now(), user_id: feed.creator_user_id, message: feed.parent_feed_id ? 'New comment added' : 'New post added'});
    feed.id = getNextId(jsonData.feeds);
    feed.user = jsonData.users.find((u) => u.id === feed.creator_user_id);
    feed.created_date = Date.now();
    feed.updated_date = Date.now();
    feed.reactions = [];
    jsonData.feeds.push(feed);
    res.json(mapFeedItemsWithUsers());
  } else {
    next();
  }
});

middlewares.push((req, res, next) => {
  if (req.method === 'PUT' && req.originalUrl === '/feeds') {
    const feed = {...req.body};
    jsonData.notifications.push({created_date: Date.now(), user_id: feed.creator_user_id, message: feed.parent_feed_id ? 'Comment updated' : 'Comment added'});
    feed.reactions.forEach((r) => {
      r.user_id = r.user.id;
    });
    const feedIndex = jsonData.feeds.findIndex((f) => f.id === feed.id);
    jsonData.feeds[feedIndex] = feed;
    res.json(mapFeedItemsWithUsers());
  } else {
    next();
  }
});

middlewares.push((req, res, next) => {
  if (req.method === 'DELETE') {
    const feedId = +req.originalUrl.split('/').reverse()[0];
    const feedIdsToRemove = jsonData.feeds
      .filter((f) => f.parent_feed_id === feedId || f.id === feedId)
      .map((f) => jsonData.feeds.findIndex((f2) => f2.id === f.id));
    jsonData.feeds = jsonData.feeds.reduce((result, f, index) => {
      if (feedIdsToRemove.includes(index)) {
        return result;
      }
      return [...result, f];
    }, []);
    res.json(mapFeedItemsWithUsers());
  } else {
    next();
  }
});

server.use(bodyParser.json());
server.use(jsonServer.rewriter({
  '/users/:id': '/users?id=:id',
}));
server.use(middlewares)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
});
