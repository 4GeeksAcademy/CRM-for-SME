import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"


export const Tasks = () => {
	const { store, actions } = useContext(Context);
    const [state, useState] = ('')    

	return (
       <p> Hola desde tasks </p>
    ) 
}