import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png";
import "../../styles/navbar.css";
import "../../styles/dropdown.css";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Navbar = (props) => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [searchParams, setSearchParams] = useState('')

  function handleLogOut() {
    actions.tokenLogout();
    navigate("/");
  }

  const handleSearchChange = (e) => {
    setSearchParams(e.target.value);
    props.onSearchChange(e.target.value); 
  };  
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/home'}>
          <img style={{ width: 130, height: 130 }} src={Logo} alt="CRM Logo" />
        </Link>
          {props.page == 'Tasks' || props.page == 'Client'? "": <form className="d-flex search-form">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Client's Name"
            value={searchParams}
            onChange={handleSearchChange}
          />
        </form> }
        <div className="navbar-nav ms-auto">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to={'/home'}>
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
                <i className="fa-solid fa-user-large" ></i>
              </button>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li type="button" className="dropdown-item" onClick={handleLogOut}>Log Out</li>
                <li><Link className="dropdown-item" to="/userinfo">User Information</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  onSearchChange: PropTypes.func,
  page: PropTypes.string,

};