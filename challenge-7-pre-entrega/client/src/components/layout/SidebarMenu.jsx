import { useState } from "react";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState();

  return (
    <aside className={`sidebar ${isOpen && "sidebar-toggle"}`}>
      <div className="sidebar__header">
        <button id="toggleMenu" onClick={() => setIsOpen(!isOpen)}>
          <i className="feather icon-menu"></i>
        </button>
        <h1>Admin.</h1>
      </div>
      <div className="sidebar__body">
        <div className="sidebar__navs">
          <nav className="sidebar__nav">
            <ul className="nav__list">
              <li className="nav__item nav__item--active">
                <a href="/" className="nav__link">
                  <i className="feather icon-home"></i>
                  <span>Inicio</span>
                </a>
              </li>
              <li className="nav__item">
                <a href="/Productos" className="nav__link">
                  <i className="feather icon-box"></i>
                  <span>Productos</span>
                </a>
              </li>
              <li className="nav__item">
                <a href="" className="nav__link">
                  <i className="feather icon-clipboard"></i>
                  <span>Pedidos</span>
                </a>
              </li>
            </ul>
          </nav>
          <p className="nav-subtitle">CONFIGURACIONES</p>
          <nav className="sidebar__nav">
            <ul className="nav__list nav__list--secondary">
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <i className="feather icon-credit-card"></i>
                  <span>Métodos de Pago</span>
                </a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <i className="feather icon-file"></i>
                  <span>Envíos</span>
                </a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <i className="feather icon-tag"></i>
                  <span>Marcas</span>
                </a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <i className="feather icon-file-text"></i>
                  <span>Contactos</span>
                </a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <i className="feather icon-user"></i>
                  <span>Cuenta</span>
                </a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">
                  <i className="feather icon-settings"></i>
                  <span>General</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="sidebar__card">
          <div className="sidebar__card__icon">
            <span>?</span>
          </div>
          <div className="sidebar__card__text">
            <h4>Centro de Ayuda</h4>
            <p>
              Ante cualquier inconveniente o duda, no dudes en contactarnos.
            </p>
          </div>
          <div className="sidebar__card__action">
            <a href="#" className="btn btn__primary">
              {" "}
              Solicitar ayuda{" "}
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;
