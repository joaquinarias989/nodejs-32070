import {
  loadMessages,
  saveMessage,
  onNewMessage,
  getSocketId,
} from "./sockets.js";

const messagesList = document.getElementById("chatList");
const formSendMessage = document.getElementById("sendMessage");
const quantityMsg = document.getElementById("msgQuantity");

function denormalize(normalizedData) {
  const user = new normalizr.schema.Entity("users");
  const message = new normalizr.schema.Entity("message", {
    author: user,
  });
  const messages = new normalizr.schema.Entity("messages", {
    message: [message],
  });
  const denormalizedData = normalizr.denormalize(
    normalizedData.result,
    messages,
    normalizedData.entities
  );
  return denormalizedData;
}

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
  let chatDenormalized = denormalize(messages);
  let chats = chatDenormalized.messages;
  if (!chats) return;

  console.log(chatDenormalized);

  let normalValue = JSON.stringify(messages).length;
  let denormalizedValue = JSON.stringify(chatDenormalized).length;

  console.log({ normalValue });
  console.log({ denormalizedValue });

  messagesList.innerHTML = "";
  chats.forEach((message) => {
    const messageLi = document.createElement("li");
    messageLi.classList.add("chat__message");
    messageLi.innerHTML = `
                <span>${message.author.nickname}</span>
                <p class="chat__message__text">${message.message}</p>
                <p class="chat__message__time">${new Date(
                  message.date
                ).toLocaleString()}</p>
          `;
    messagesList.appendChild(messageLi);
  });
  quantityMsg.innerHTML = chats.length.toString();
}

// Append Message on new Message
function appendMessage(msg) {
  let chatDenormalized = denormalize(msg);
  let chat = chatDenormalized.messages;

  let normalValue = JSON.stringify(msg).length;
  let denormalizedValue = JSON.stringify(chatDenormalized).length;

  console.log({ normalValue });
  console.log({ denormalizedValue });

  const messageLi = document.createElement("li");
  messageLi.classList.add("chat__message");
  messageLi.innerHTML = `
                <span>${chat.author.nickname}</span>
                <p class="chat__message__text">${chat.message}</p>
                <p class="chat__message__time">${new Date(
                  chat.date
                ).toLocaleString()}</p>
          `;
  messagesList.appendChild(messageLi);
  quantityMsg.innerHTML = Number(quantityMsg.innerHTML) + 1;
}

// Save Message
formSendMessage.addEventListener("submit", (e) => {
  e.preventDefault();
  const { email, nameUser, surname, age, nickname, message } =
    e.target.elements;

  let chatMessage = {
    author: {
      id: email.value,
      name: nameUser.value,
      surname: surname.value,
      age: age.value,
      nickname: nickname.value,
      avatar: "https://",
    },
    date: new Date(),
    message: message.value,
  };

  saveMessage(chatMessage);
  e.target.reset();
});
