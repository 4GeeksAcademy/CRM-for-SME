import React, { Component } from "react";
import Logo from "../../img/Logo.png"
import "../../styles/footer.css"

export const Footer = () => (
	<footer className="footer mt-auto text-center justify-content-center d-md-flex">
		<p>
			<img style={{ width: 70, height: 70 }} src={Logo} alt="CRM Logo" />
			4geeks LATAM Developers 2024 ©
		</p>
	</footer>
);
