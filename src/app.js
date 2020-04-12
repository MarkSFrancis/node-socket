/* eslint-disable no-console */
(function app() {
  const output = (function makeOutput() {
    const outputElement = document.getElementById('socket-output');

    /**
     *
     * @param {string} msg
     * @param {*} content
     */
    function appendOutput(msg, content) {
      const msgContainer = document.createElement('div');

      if (arguments.length > 1) {
        let formattedContent = content;

        if (typeof (content) !== 'string') {
          formattedContent = JSON.stringify(content);
        }

        msgContainer.innerText = `${msg}: ${formattedContent}`;
        console.log(msg, formattedContent);
      } else {
        msgContainer.innerText = `${msg}`;
        console.log(msg);
      }

      outputElement.appendChild(msgContainer);
    }

    return {
      log: appendOutput,
    };
  }());

  if (!window.WebSocket) {
    console.error('WebSocket is not supported in this browser');
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