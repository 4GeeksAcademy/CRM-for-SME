import React, { Component } from "react";
import Logo from "../../img/Logo.png"
import "../../styles/footer.css"

export const Footer = () => (
	<footer className="footer text-center justify-content-center align-items-center d-md-flex">
		<p className="pt-4">
			<img style={{ width: 100, height: 100 }} src={Logo} alt="CRM Logo" />
			4geeks LATAM Developers 2024 ©
		</p>
	</footer>
);
