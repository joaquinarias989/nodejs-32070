import { useEffect, useRef } from "react";

const Chat = ({ show, setShow }) => {
  return (
    <div className={show ? "chat chat--open" : "chat"}>
      <div className="chat__header">
        <h5>Chat del equipo</h5>
        <button className="chat__header__icon" onClick={() => setShow(false)}>
          <i className="feather icon-x-square"></i>
        </button>
      </div>
      <div className="chat__main">
        <div className="chat__message">
          <span>Juan Lopez</span>
          <p className="chat__message__text">
            Hola! Yo estuve actualizando el stock esta mañana, aviso por las
            dudas!
          </p>
          <p className="chat__message__time">8:20 a.m.</p>
        </div>
        <div className="chat__message chat__message--own">
          <span>Yo</span>
          <p className="chat__message__text">
            Genial Juan, me ahorraste trabajo jaja!
          </p>
        </div>
        <div className="chat__message chat__message--own">
          <p className="chat__message__text">
            Me pongo a armar pedidos entonces, gracias!
          </p>
          <p className="chat__message__time">8:20 a.m.</p>
        </div>
        <div className="chat__message">
          <span>Juan Lopez</span>
          <p className="chat__message__text">Dale, por nada!</p>
          <p className="chat__message__time">8:20 a.m.</p>
        </div>
      </div>
      <div className="chat__reply">
        <form id="sendMessage" className="flex-column gap-1">
          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="ejemplo@gmail.com"
            required
          />
          <input
            type="text"
            className="form__input"
            placeholder="Mensaje"
            required
          />
          <button className="btn__action" type="submit">
            <div className="hover">
              <i className="feather icon-mail"></i> <span>Enviar mensaje</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
