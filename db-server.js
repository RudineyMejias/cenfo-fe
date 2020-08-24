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
    INVALID: 'Invalid credentials',
    UNAUTHORIZED: 'The user is not logged in',
    EXPIRED: 'The session has expired',
  },
  es: {
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
    totalRequests = 100;
    return res.status(401).send({
      message: messages[req.headers.lang || 'en'].EXPIRED,
    });
  } else {
    next();
  }
});

// Send unauthorized if the authorization header is not present
middlewares.push((req, res, next) => {
  if (req.originalUrl !== '/login' && !req.headers.authorization) {
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
      return res.status(401).send({
        message: messages[req.headers.lang || 'en'].INVALID,
      });
    }
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
    user.id = getNextId(jsonData.users);
    user.photo_url = 'https://picsum.photos/200/200?grayscale',
    jsonData.users.push(user);
    res.json({user, token: 'authorization.token'});
  } else {
    next();
  }
});

middlewares.push((req, res, next) => {
  if (req.method === 'POST' && req.originalUrl === '/feeds') {
    const feed = {...req.body};
    feed.id = getNextId(jsonData.feeds);
    feed.user = jsonData.users.find((u) => u.id === feed.creator_user_id);
    feed.created_date = Date.now();
    feed.updated_date = Date.now();
    feed.reactions = [];
    jsonData.feeds.push(feed);
    res.json(feed);
  } else {
    next();
  }
});

middlewares.push((req, res, next) => {
  if (req.method === 'PUT' && req.originalUrl === '/feeds') {
    const feed = {...req.body};
    feed.reactions.forEach((r) => {
      r.user_id = r.user.id;
    });
    const feedIndex = jsonData.feeds.findIndex((f) => f.id === feed.id);
    jsonData.feeds[feedIndex] = feed;
    res.json(req.body);
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
    console.log({feedIdsToRemove, feedId});
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

middlewares.push((req, res, next) => {
  if (req.method === 'PUT' && req.originalUrl === '/feeds') {
    re.body.updated_date = Date.now();
    const feedIndex = jsonData.feeds.findIndex(f => f.id === req.body.id);
    jsonData.feeds[feedIndex] = {...req.body};
    res.json(jsonData.feeds[feedIndex]);
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
