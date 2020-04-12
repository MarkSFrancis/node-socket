import output from './output';

(function app() {
  if (!window.WebSocket) {
    output.log('WebSockets are not supported in this browser');
    return;
  }

  const socketProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const socketUrl = `${socketProtocol}//${window.location.hostname}:${window.location.port}/socket`;
  const connection = new window.WebSocket(socketUrl);

  connection.onopen = () => {
    output.log('Connection opened!');
    connection.send('Hello from client!');
  };

  connection.onerror = (err) => {
    output.log('WebSocket error', err);
  };

  connection.onmessage = (e) => {
    output.log('Message recieved', e.data);
  };
}());
