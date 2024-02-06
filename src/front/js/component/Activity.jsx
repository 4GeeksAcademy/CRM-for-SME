import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"

export const Activity = () => {
	const { store, actions } = useContext(Context);
    const [state, setState] = useState([]);
   
    


	return (

        <>
        
        <div className="container d-flex flex-column justify-content-center align-items-center m-4 w-100">
            <ul>
            {store.activity.map((activity, index) => {
							return (
								<li className="border border-dark p-5 my-2 d-flex justify-content-end row bg-light" style={{width:'30rem'}}key={index}>
                                    <span className="col-6">{activity.activity}</span> 
                                    <span className="col-6">Date created: {activity.date}</span> 
                                 </li>
							);
						})}                              
               
            </ul>       
        
        </div>
        </>
        
    ) 
}
