import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isActive, setIsActive] = useState(false);

  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className={`sidebar ${isActive ? "close" : ""}`}>
        <Link className="logo-box text-decoration-none" onClick={toggleSidebar}>
          <i className="bi bi-menu-down"></i>
        </Link>

        <ul className="sidebar-list">
          <li>
            <div className="title">
              <Link to="/" className="link">
                <i className="bi bi-grid-3x3"></i>
                <span className="name">Dashboard</span>
              </Link>
            </div>
            <div className="submenu">
              <Link to="/" className="link submenu-title">
                Dashboard
              </Link>
            </div>
          </li>

          <li>
            <div className="title">
              <Link to="/" className="link">
                <i className="bi bi-person"></i>
                <span className="name">Master</span>
              </Link>
            </div>
            <div className="submenu">
              <Link to="/" className="link submenu-title">Master</Link>
            </div>
          </li>

          <li>
            <div className="title">
              <Link to="/" className="link">
                <i className="bi bi-gear"></i>
                <span className="name">Billing</span>
              </Link>
            </div>
            <div className="submenu">
              <Link to="/" className="link submenu-title">Billing</Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
