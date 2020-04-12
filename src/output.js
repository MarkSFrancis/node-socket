/* eslint-disable no-console */

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

export default output;
