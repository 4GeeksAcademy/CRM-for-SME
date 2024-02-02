import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"

export const Client = () => {
	const { store, actions } = useContext(Context);
    const [state, useState] = ('')


    const activeSection = () => {
        
    }

	return (
        <>

        <div className="row p-0">
        <div className="col-3 border border-black p-0" style={{height:"100vh"}}>
            <div className="d-flex justify-content-center align-items-center h-25 border border-black">
             <img src={Logo} style={{width:'100px', height: '100px'}} alt="client Avatar" />
             <h4>Client's Name</h4>
            </div>
            <div className="container h-50 my-4">
                <div className="container d-flex justify-content-between w-100">
                    <h6 className='m-1 fw-bold'>Email:</h6>
                    <p className='m-1'>John@email.com</p>
                    <i className="fa-solid fa-pen"></i>
                    
                </div>

                <div className="container d-flex justify-content-between w-100">
                    <h6  className='m-1 fw-bold'>Phone:</h6>
                    <p className='m-1'>314567890</p>
                    <i className="fa-solid fa-pen"></i>
                </div>

                <div className="container d-flex justify-content-between w-100">
                    <h6 className='m-1 fw-bold'>Company:</h6>
                    <p className='m-1'>Google</p>
                    <i className="fa-solid fa-pen"></i>
                </div>

                <div className="container d-flex justify-content-between w-100">
                    <h6 className='m-1 fw-bold'>Address: </h6>
                    <p className='m-1' >John doe avenue John street Lorem ipsum dolor sit amet. </p>
                    <i className="fa-solid fa-pen"></i>
                </div>
            </div>

            
        </div>
        <div className="col-9 p-0 h-100">

            <div className="d-flex w-100 justify-content-center p-3 bg-dark">
            <h5 class="btn btn-outline-primary m-2">Activity</h5>
            <h5 class="btn btn-outline-primary m-2">Tasks</h5>
            <h5 class="btn btn-outline-primary m-2">Notes</h5>
            <h5 class="btn btn-outline-primary m-2">Billing</h5>

            </div>

        </div>
        </div>




        </>
    )
}
