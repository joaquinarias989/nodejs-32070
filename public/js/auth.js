import { requireMessages } from './sockets.js';

window.addEventListener('DOMContentLoaded', () => {
  getUser();
});

const userText = document.getElementById('user');
const userImg = document.getElementById('userImg');
const btnLogout = document.getElementById('btnLogout');
let userLogued;

function getUser() {
  axios
    .get('http://localhost:8080/api/auth/user-logued')
    .then((resp) => {
      if (!resp.data.success) {
        window.location.href = '/IniciarSesion';
        return;
      }
      userLogued = resp.data.data;
      if (userText) userText.innerHTML = userLogued.name;
      userImg.setAttribute(
        'src',
        `http://localhost:8080/api/uploads/image/${userLogued.avatar}`
      );

      requireMessages(userLogued.email);
    })
    .catch((error) => {
      console.log(error);
      window.location.href = '/IniciarSesion';
    });
}

btnLogout.addEventListener('click', logout);

let URI_API = window.location.host;
if (URI_API.includes('localhost')) {
  URI_API = `http://${URI_API}`;
} else {
  URI_API = `https://${URI_API}`;
}

function logout() {
  axios
    .delete(`${URI_API}/api/auth/logout`)
    .then((resp) => {
      console.log(resp);

      if (resp.data.success) {
        window.location.href = '/IniciarSesion';
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
