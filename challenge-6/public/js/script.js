let btnMenu = document.getElementById("toggleMenu");
let body = document.querySelector("body");
let header = document.querySelector(".header");
let main = document.querySelector(".main");
let navLink = document.querySelector(".nav__link");

btnMenu.onclick = () => {
  body.classList.toggle("show-sidebar");
};
header.onclick = () => {
  body.classList.remove("show-sidebar");
};
main.onclick = () => {
  body.classList.remove("show-sidebar");
};
navLink.onclick = () => {
  body.classList.remove("show-sidebar");
};
