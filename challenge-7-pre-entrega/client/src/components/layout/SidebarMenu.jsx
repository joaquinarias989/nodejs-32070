import { useState } from "react";
import { NavLink } from "react-router-dom";

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
              <li className="nav__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-home"></i>
                  <span>Inicio</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/Productos"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-box"></i>
                  <span>Productos</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/Pedidos"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-clipboard"></i>
                  <span>Pedidos</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <p className="nav-subtitle">CONFIGURACIONES</p>
          <nav className="sidebar__nav">
            <ul className="nav__list nav__list--secondary">
              <li className="nav__item">
                <NavLink
                  to="/MetodosDePago"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-credit-card"></i>
                  <span>Métodos de Pago</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/Envios"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-file"></i>
                  <span>Envíos</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/Marcas"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-tag"></i>
                  <span>Marcas</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/ConsultasRecibidas"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-file-text"></i>
                  <span>Consultas</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/Cuenta"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-user"></i>
                  <span>Cuenta</span>
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/Configuracion"
                  className={({ isActive }) =>
                    isActive ? "nav__link nav__link--active" : "nav__link "
                  }
                >
                  <i className="feather icon-settings"></i>
                  <span>General</span>
                </NavLink>
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
            <NavLink to="" className="btn btn__primary">
              {" "}
              Solicitar ayuda{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;
