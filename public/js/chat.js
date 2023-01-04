import {
  loadMessages,
  saveMessage,
  onNewMessage,
  getSocketId,
} from './sockets.js';

const messagesList = document.getElementById('chatList');
const formSendMessage = document.getElementById('sendMessage');
const quantityMsg = document.getElementById('msgQuantity');

let socketId = '';

// Load initial Prods & Chat
window.addEventListener('DOMContentLoaded', () => {
  loadMessages(renderMessages);
  onNewMessage(appendMessage);
  getSocketId((id) => {
    socketId = id;
  });
});

// Render Messages
function renderMessages(messages) {
  if (!messages || !messages.length) return;
  messagesList.innerHTML = '';
  messages.forEach((message) => {
    const messageLi = document.createElement('li');
    messageLi.classList.add('chat__message');
    message.authorType === 'Usuario' &&
      messageLi.classList.add('chat__message--own');
    messageLi.innerHTML = `
                <span>${message.email}</span>
                <p class="chat__message__text">${message.body}</p>
                <p class="chat__message__time">${message.timestamp}</p>
          `;
    messagesList.appendChild(messageLi);
  });
  quantityMsg.innerHTML = messages.length.toString();
}
// Append Message on new Message
function appendMessage(message) {
  const messageLi = document.createElement('li');
  messageLi.classList.add('chat__message');
  message.authorType === 'Usuario' &&
    messageLi.classList.add('chat__message--own');
  messageLi.innerHTML = `
                <span>${
                  message.authorType === 'Usuario' ? 'Yo' : 'Sistema'
                }</span>
                <p class="chat__message__text">${message.body}</p>
                <p class="chat__message__time">${message.timestamp}</p>
          `;
  messagesList.appendChild(messageLi);
  quantityMsg.innerHTML = Number(quantityMsg.innerHTML) + 1;
}
// Save Message
formSendMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const { email, message } = e.target.elements;
  saveMessage(email.value, message.value, new Date());
  e.target.reset();
});
