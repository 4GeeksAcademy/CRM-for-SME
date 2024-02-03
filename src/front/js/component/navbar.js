import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png"

export const Navbar = () => {
	return (
			<nav class="navbar navbar-expand-lg navbar-light">
			  <div class="container-fluid">
			
				<a class="navbar-brand" href="#">
					<img style={{ width: 130, height: 130 }} src={Logo} alt="CRM Logo" />
				</a>
		

				

				<form class="d-flex search-form">
				  <input
					class="form-control me-2"
					type="search"
					placeholder="Buscar"
					aria-label="Search"
				  />
				  <button class="btn btn-outline-success" type="submit">Buscar</button>
				</form>
		

				
				<div class="navbar-nav ms-auto">
				  

			
				<div class="navbar-nav ms-auto">
				 

				  <a class="nav-link" href="#">Clients</a>
				  <a class="nav-link" href="#">Tasks</a>
				  <a class="nav-link" href="#">User</a>
				</div>
			  </div>
			  </div>
			</nav>

		 

	);
};
