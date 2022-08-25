import { useState } from "react";
import { useLocation } from "react-router-dom";
import { header, setHeader } from "../../helpers/headerHelper";
import Chat from "../Chat";
const Header = () => {
  const [showChat, setShowChat] = useState(false);
  const { pathname } = useLocation();
  setHeader(pathname);

  return (
    <header className="header">
      <div className="header__left">
        <h1>{header.title}</h1>
        <p>{header.desc}</p>
      </div>
      <div className="header__right">
        <div className="header__action header__action--search">
          <i className="feather icon-search"></i>
          <input type="search" placeholder="Buscar en el panel" />
          <button className="filter__button">
            <i className="feather icon-sliders"></i>
          </button>
        </div>
        <div className="header__profile">
          <button className="header__action">
            <i className="feather icon-bell"></i>
          </button>
          <button
            className="header__action"
            onClick={() => setShowChat(!showChat)}
          >
            <i className="feather icon-message-square">
              <span className="header__action--badge">2</span>
            </i>
          </button>
          <a href="" className="header__action header__action--profile">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="Imagen de perfil"
            />
          </a>
        </div>
      </div>
      <Chat show={showChat} setShow={setShowChat} />
    </header>
  );
};

export default Header;
