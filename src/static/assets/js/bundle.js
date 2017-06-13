(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
require('./index/index');
},{"./index/index":1}]},{},[2]);
