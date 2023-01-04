let btnMenu = document.getElementById("toggleMenu");
let body = document.querySelector("body");
let header = document.querySelector(".header");
let main = document.querySelector(".main");
let navLink = document.querySelector(".nav__link");
let btnChat = document.getElementById("toggleChat");
let chat = document.querySelector(".chat");

btnMenu.onclick = () => {
  body.classList.toggle("show-sidebar");
  chat.classList.remove("chat--open");
};
header.onclick = () => {
  body.classList.remove("show-sidebar");
};
main.onclick = () => {
  body.classList.remove("show-sidebar");
  chat.classList.remove("chat--open");
};
navLink.onclick = () => {
  body.classList.remove("show-sidebar");
  chat.classList.remove("chat--open");
};
btnChat.onclick = () => {
  chat.classList.toggle("chat--open");
};
