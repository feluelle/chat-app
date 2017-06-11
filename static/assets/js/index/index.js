const socket = io();

class Index {
    constructor() {
        // Send message on click
        document.querySelector('.js-send-message')
            .addEventListener("click", this.sendMessage);

        // Send message on keyup ("enter" or "is typing..")
        document.querySelector('.js-message')
            .addEventListener("keyup", (e) => {
                if (e.keyCode === 13) {
                    this.sendMessage();
                } else {
                    this.sendIsTypingMessage();
                }
            });

        // Append message when message received
        socket.on('chat message', this.appendMessage);

        // Append message when message received
        socket.on('is typing', this.appendIsTypingMessage);
    }

    sendMessage() {
        let messageElement = document.querySelector('.js-message');
        socket.emit('chat message', messageElement.value);
        messageElement.value = '';
    }

    appendMessage(msg) {
        let messagesElement = document.querySelector('.js-messages');
        let liElement = document.createElement('li');
        liElement.innerHTML = msg;
        messagesElement.append(liElement);

        window.scrollTo(0, document.body.scrollHeight);
    }

    sendIsTypingMessage() {
        socket.emit('is typing', 'typing...');
    }

    appendIsTypingMessage() {
        let messagesElement = document.querySelector('.js-messages');
        let liElement = document.createElement('li');
        liElement.innerHTML = 'is typing';
        messagesElement.append(liElement);
    }
}

module.exports = new Index();