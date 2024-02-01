import React from "react";
import { Link } from "react-router-dom";





export const ModalAddClient = () => {
    return(
        
<div className="card border-dark mb-3" style={{width: "50rem"}}>
    <div className="card-body">

        <div className="container-fluid d-flex justify-content-center align-items-center"> 
        Modal/ Add client

         </div>

        <label htmlFor="card" className="form-control border-0 fw-bold"></label>
        <input className="form-control" placeholder="First name "/>
        <input className="form-control" placeholder="Last name "/>
        <input className="form-control" placeholder="Email "/>
        <input className="form-control" placeholder="Phone number "/>
        <input className="form-control" placeholder="Address "/>
        <input className="form-control" placeholder="Company "/>

        <div className="row">
            <div className="col-6">

                <button href="#" className="btn bg-success mx-auto d-block">Add Client</button>
            </div>
            <div className="col-6">
                <button href="#" className="btn bg-danger mx-auto d-block">Cancel</button>
            </div>
        </div>

    </div>
</div>

    );
};