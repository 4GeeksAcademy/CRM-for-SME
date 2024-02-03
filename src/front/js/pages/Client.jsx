import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"
import "../../styles/client.css";
import { Activity } from "../component/Activity.jsx";
import { Billing } from "../component/Billing.jsx";
import { Tasks } from "../component/Tasks.jsx";
import { Notes } from "../component/Notes.jsx";
import { Navbar } from "../component/navbar.js";

export const Client = () => {
	const { store, actions } = useContext(Context);
    const [state, setState] = useState('Activity')


    const activeSection = (id) => {
        setState(id)
    }

	return (
        <>
        <Navbar />
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
                    <i className="fa-solid fa-pen cursor"></i>
                    
                </div>

                <div className="container d-flex justify-content-between w-100">
                    <h6  className='m-1 fw-bold'>Phone:</h6>
                    <p className='m-1'>314567890</p>
                    <i className="fa-solid fa-pen cursor"></i>
                </div>

                <div className="container d-flex justify-content-between w-100">
                    <h6 className='m-1 fw-bold'>Company:</h6>
                    <p className='m-1'>Google</p>
                    <i className="fa-solid fa-pen cursor"></i>
                </div>

                <div className="container d-flex justify-content-between w-100">
                    <h6 className='m-1 fw-bold'>Address: </h6>
                    <p className='m-1' >John doe avenue John street Lorem ipsum dolor sit amet. </p>
                    <i className="fa-solid fa-pen cursor"></i>
                </div>
            </div>

            
        </div>
        <div className="col-9 p-0 h-100">

            <div className="d-flex w-100 justify-content-center bg-dark pt-3">
            <h5 className="text-light border border-light border-bottom-0 rounded p-1 mx-2 mt-1 cursor" onClick={() => activeSection('Activity')}>Activity</h5>
            <h5 className="text-light border border-light border-bottom-0 rounded p-1 mx-2 mt-1 cursor"onClick={() => activeSection('Tasks')}>Tasks</h5>
            <h5 className="text-light border border-light border-bottom-0 rounded p-1 mx-2 mt-1 cursor" onClick={() => activeSection('Notes')}>Notes</h5>
            <h5 className="text-light border border-light border-bottom-0  rounded p-1 mx-2 mt-1 cursor" onClick={() => activeSection('Billing')}>Billing</h5>

            </div>
            <div className="container row">
                {state == 'Activity' ? <Activity/> : state == 'Tasks' ? <Tasks/> : state == 'Notes' ? <Notes/> : <Billing/>}
            </div>

        </div>
        </div>




        </>
    )
}
