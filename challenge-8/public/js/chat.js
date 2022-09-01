import {
  loadMessages,
  saveMessage,
  onNewMessage,
  getSocketId,
} from "./sockets.js";

const messagesList = document.getElementById("chatList");
const formSendMessage = document.getElementById("sendMessage");
const quantityMsg = document.getElementById("msgQuantity");

let socketId = "";

// Load initial Prods & Chat
window.addEventListener("DOMContentLoaded", () => {
  loadMessages(renderMessages);
  onNewMessage(appendMessage);
  getSocketId((id) => {
    socketId = id;
  });
});

// Render Messages
function renderMessages(messages) {
  messagesList.innerHTML = "";
  messages.forEach((message) => {
    const messageLi = document.createElement("li");
    messageLi.classList.add("chat__message");
    message.author === "Yo" && messageLi.classList.add("chat__message--own");
    messageLi.innerHTML = `
                <span>${message.author}</span>
                <p class="chat__message__text">${message.text}</p>
                <p class="chat__message__time">${message.date}</p>
          `;
    messagesList.appendChild(messageLi);
  });
  quantityMsg.innerHTML = messages.length.toString();
}
// Append Message on new Message
function appendMessage(message) {
  console.log(socketId, message.id);
  const msg = message.data;
  const messageLi = document.createElement("li");
  messageLi.classList.add("chat__message");
  message.id === socketId && messageLi.classList.add("chat__message--own");
  messageLi.innerHTML = `
                <span>${message.id === socketId ? "Yo" : msg.author}</span>
                <p class="chat__message__text">${msg.text}</p>
                <p class="chat__message__time">${msg.date}</p>
          `;
  messagesList.appendChild(messageLi);
  quantityMsg.innerHTML = Number(quantityMsg.innerHTML) + 1;
}
// Save Message
formSendMessage.addEventListener("submit", (e) => {
  e.preventDefault();
  const { email, message } = e.target.elements;
  saveMessage(email.value, message.value, new Date().toLocaleString());
  e.target.reset();
});
