import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img style={{ width: 130, height: 130 }} src={Logo} alt="CRM Logo" />
        </Link>

        <form className="d-flex search-form">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Buscar
          </button>
        </form>

        <div className="navbar-nav ms-auto">
          <Link to="/clients" className="nav-link">
            Clients
          </Link>
          <Link to="/tasks" className="nav-link">
            Tasks
          </Link>
          <Link to="/user" className="nav-link">
            User
          </Link>
		  
        </div>
      </div>
    </nav>
  );
};