import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"


export const Notes = () => {
	const { store, actions } = useContext(Context);
    const [state, useState] = ('')    


    


	return (
        <div className="container d-flex flex-column justify-content-center align-items-center m-4 row">

                            <div className="col-12 d-flex justify-content-end align-items-end"> 
                                <button type="button" className="btn btn-primary">Add Note</button>
                            </div>
                           

                            <ul>
                            {store.notes.map((note, index) => {
                                            return (
                                                <li className="border border-dark p-2 my-2 d-flex row bg-light" key={index}>
                                                    
                                                                                                     
                                                    <span className="col-8">{note.text}</span> 
                                                  
                                                    


                                                    <div className="row col-4">
                                                            <div className="col-5 d-flex flex-column">
                                                                <h7 className="fw-bold">User</h7>
                                                                <span>{note.addedByUser}</span> 
                                                            </div>
                        
                                                                        
                                                            <div className="col-5 d-flex flex-column">
                                                                <h7 className="fw-bold" >Date Created</h7>
                                                                <span>{note.dateCreated}</span> 
                                                            </div>
                        
                                                        

                                                            
                                                            <div className="col-2 d-flex">
                                                                <i className="fa-solid fa-pen mx-1"></i>
                                                                <i className="fa-solid fa-trash mx-1"></i>
                                                            </div>
                                                    </div>

                                                    
                                                     
                                                  
                                                 </li>
                                            );
                                        })}                              
                               
                            </ul>       
                        
                        </div>
                        );
}