import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import "../../styles/navbar.css"; 
import "../../styles/dropdown.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/home'}>
          <img style={{ width: 130, height: 130 }} src={Logo} alt="CRM Logo" />
        </Link>
        <form className="d-flex search-form">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">Buscar</button>
        </form>
        <div className="navbar-nav ms-auto">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to={'/client'}>
              Clients
            </Link>
            <a className="nav-link" href="/totaltasks">
              Tasks
            </a>
            
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user" style={{ fontSize: "1.1rem" }}></i> 
              </button>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" to="/">Log Out</Link></li>
                <li><Link className="dropdown-item" to="/userinfo">User Information</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
