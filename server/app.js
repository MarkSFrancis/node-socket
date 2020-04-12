/* eslint-disable no-console */
import http from 'http';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import WebSocket from 'ws';
import webpackConfig from '../webpack.config';

const httpPort = process.env.PORT || 3000;

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

app.use(express.static('../public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server,
  path: '/socket',
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received message', message);
    if (typeof (message) === 'string') {
      ws.send(`Reversed message: ${[...message].reverse().join('')}`);
    } else {
      ws.send('Cannot reverse message - did not receive string');
    }
  });

  ws.send('Connected to server');

  setInterval(() => {
    ws.send(`Server message sent to client at ${new Date().toISOString()}`);
  }, 2000);
});

server.listen(httpPort, () => console.log(`App listening on ${httpPort}`));
