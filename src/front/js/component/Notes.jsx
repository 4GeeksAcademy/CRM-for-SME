import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"


export const Notes = () => {
	const { store, actions } = useContext(Context);
    const [state, useState] = ('')    

	return (
       <p> Hola desde Notes </p>
    ) 
}