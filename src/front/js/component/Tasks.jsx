import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"


export const Tasks = () => {
	const { store, actions } = useContext(Context);
    const [state, useState] = ('') 
    

    

	return (
                  <div className="container d-flex flex-column justify-content-center align-items-center m-4 row">

                            <div className="col-12 d-flex justify-content-end align-items-end"> 
                                <button type="button" className="btn btn-primary">Add Task</button>
                            </div>
                           

                            <ul>
                            {store.tasks.map((task, index) => {
                                            return (
                                                <li className="border border-dark p-2 my-2 d-flex justify-content-between row bg-light" key={index}>
                                                    <div className="col-2 d-flex flex-column">
                                                        <h5 className="fw-bold">User Asign</h5>
                                                        <span>{task.userAsing}</span> 
                                                    </div>
                
                                                    <div className="col-2 d-flex flex-column">
                                                        <h5 className="fw-bold" >Task title</h5>
                                                        <span>{task.title}</span> 
                                                    </div>
                
                                                    <div className="col-2 d-flex flex-column">
                                                        <h5 className="fw-bold" >Due Date</h5>
                                                        <span>{task.dueDate}</span> 
                                                    </div>
                
                                                    <div className="col-2 d-flex flex-column">
                                                        <h5 className="fw-bold" >Priority</h5>
                                                        <span className={task.priority === "Low"? 'text-success': task.priority === "Medium" ? 'text-warning': 'text-danger'}>{task.priority}</span> 
                                                    </div>

                                                    <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                                                        <h5 className="fw-bold">Status</h5>
                                                        <button type="button" className={task.complete == false ? 'btn btn-secondary' : 'btn btn-success'} onClick={()=>actions.taskAsDone(task.idTask)}>{task.complete == false ? 'Pending' : 'Completed'}</button>
                                                    </div>
                                                    
                                                    <div className="col-1 d-flex">
                                                        <i className="fa-solid fa-pen mx-1"></i>
                                                        <i className="fa-solid fa-trash mx-1"></i>
                                                    </div>
                                                    
                                                     
                                                  
                                                 </li>
                                            );
                                        })}                              
                               
                            </ul>       
                        
                        </div>
                        );
                                    
                                        
                }                           
           
