const http = require('http');
const express = require('express');
const rewrite = require('express-urlrewrite');
const onFinished = require('on-finished');
const colorize = require('colorize');

const DE = '/de/';
const EN = '/';
const COLORS = Object.freeze({
  '1': 'blue',
  '2': 'green',
  '3': 'cyan',
  '4': 'red',
  '5': 'magenta'
});

const accessLoggingMiddleWare = function (req, res, next) {
  const start = Date.now();
  const { method, path } = req;

  onFinished(res, () => {
    const end = Date.now();
    const time = end - start;
    const statusCode = res.statusCode;
    const colorIndex = (statusCode + '').charAt(0);
    const color = COLORS[colorIndex];
    const coloredStatusCode = colorize.ansify(`#${color}[${statusCode}]`);
    console.log(`${method.toUpperCase()} ${path}: ${coloredStatusCode} (${time} ms)`);
  });

  next();
}

const changeOriginalUrlMiddleware = function (req, _, next) {
  req.originalUrl = req.path;
  next();
};

const rewriteMiddlewares = function (pattern, targetDE, targetEN, prefix = '') {
  const regex = new RegExp(`^${prefix}/(de/)?${pattern}$`, 'u');
  return [
    function (req, res, next) {
      const path = req.path;
      const target = path.startsWith(prefix + DE) ? targetDE : targetEN;
      rewrite(regex, target)(req, res, next);
    },
    changeOriginalUrlMiddleware
  ];
};

const redirectionMiddleware = function (req, res, next) {
  const path = req.path;
  const regex = /^(.*\/)index\.x?html?$/u;
  if (regex.test(path)) {
    res.redirect(302, path.replace(regex, '$1'));
    return;
  }

  next();
};

const staticMiddleware = express.static('./web', { redirect: false });

const app = express();

app.use(accessLoggingMiddleWare);
app.use(...rewriteMiddlewares('[^\\.]+', DE, EN));
app.use(redirectionMiddleware);
app.use(staticMiddleware);
app.use(...rewriteMiddlewares('.+\\.md', '/docs/de/404.md', '/docs/404.md', '/docs'));
app.use(staticMiddleware);

const server = http.createServer(app);

server.listen({ host: '127.0.0.1', port: 3000 }, () => {
  console.log('Startet, listening on http://localhost:3000');
});
