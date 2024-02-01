import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
			<nav class="navbar navbar-expand-lg navbar-light">
			  <div class="container-fluid">
			
				<a class="navbar-brand" href="#">
				  
				</a>
		
				<!-- Barra de búsqueda -->
				<form class="d-flex search-form">
				  <input
					class="form-control me-2"
					type="search"
					placeholder="Buscar"
					aria-label="Search"
				  />
				  <button class="btn btn-outline-success" type="submit">Buscar</button>
				</form>
		
				<!-- Botones: Clients, Tasks, User -->
				<div class="navbar-nav ms-auto">
				  <!-- Muevo los botones a la derecha -->
				  <a class="nav-link" href="#">Clients</a>
				  <a class="nav-link" href="#">Tasks</a>
				  <a class="nav-link" href="#">User</a>
				</div>
			  </div>
			</nav>
		  </body>
		</html>
	);
};
