import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png"
import "../../styles/navbar.css"

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
						<Link className="nav-link" to={'/home'}>Clients</Link>
						<a className="nav-link" href="#">Tasks</a>
						<a className="nav-link" href="#">User</a>
					</div>
				</div>
			</div>
		</nav>
	);
};