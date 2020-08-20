// server.js
const jsonServer = require('json-server')
const bodyParser = require('body-parser');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

let totalRequests = 100;

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

server.use(bodyParser.json());
server.use(jsonServer.rewriter({
  '/users/:id': '/users?id=:id'
}));
server.use(middlewares)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
});
