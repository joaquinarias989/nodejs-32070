import {
  loadProds,
  saveProd,
  onNewProd,
  loadMessages,
  saveMessage,
  onNewMessage,
  getSocketId,
} from "./sockets.js";
const productsList = document.getElementById("productsList");
const formAddProduct = document.getElementById("formAddProduct");

const messagesList = document.getElementById("chatList");
const formSendMessage = document.getElementById("sendMessage");

let socketId = "";
// Load initial Prods & Chat
window.addEventListener("DOMContentLoaded", () => {
  loadProds(renderProds);
  onNewProd(appendProd);
  loadMessages(renderMessages);
  onNewMessage(appendMessage);
  getSocketId((id) => {
    socketId = id;
  });
});

// Render Prods
function renderProds(prods) {
  productsList.innerHTML = "";
  prods.forEach((prod) => {
    const prodRow = document.createElement("tr");
    prodRow.innerHTML = `
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="img-rounded">
                  <img
                    src=${prod.img}
                    alt="Imagen del producto ${prod.title}}"
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </div>
              </td>
              <td>${prod.title}</td>
              <td>$ ${prod.price}</td>
              <th>
                <button>
                  <i class="feather icon-edit"></i>
                </button>
                <button type="submit">
                  <i class="feather icon-trash"></i>
                </button>
              </th>
        `;
    productsList.appendChild(prodRow);
  });
}

// Apend Prod on new Prod
function appendProd(prod) {
  const prodRow = document.createElement("tr");
  prodRow.innerHTML = `
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="img-rounded">
                  <img
                    src=${prod.img}
                    alt="Imagen del producto ${prod.title}}"
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </div>
              </td>
              <td>${prod.title}</td>
              <td>$ ${prod.price}</td>
              <th>
                <button>
                  <i class="feather icon-edit"></i>
                </button>
                <button type="submit">
                  <i class="feather icon-trash"></i>
                </button>
              </th>
        `;
  productsList.appendChild(prodRow);
}

// Save a new Prod
formAddProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const { title, price, img } = e.target.elements;
  saveProd(title.value, price.value, img.value);
  e.target.reset();
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
}

// Save Message
formSendMessage.addEventListener("submit", (e) => {
  e.preventDefault();
  const { email, message } = e.target.elements;
  let idSocket = getSocketId((id) => {
    return id;
  });
  console.log(idSocket);
  saveMessage(email.value, message.value, new Date().toLocaleDateString());
  e.target.reset();
});
