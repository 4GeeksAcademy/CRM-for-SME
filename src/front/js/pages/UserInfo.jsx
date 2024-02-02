import React from "react";
import { Link } from "react-router-dom";





export const UserInfo = () => {
    return(
<div className="container-fluid"> 
  <div className="card-header m-3 card text-center">

             <h5 className="h2 fw-bold"> 
             User info
            </h5>
    </div>


    <div className="card-header m-3 card text-center fw-bold">
        <center>
            <div>Name:</div>
            <div>Email:</div>
            <button className="btn btn-secondary">Change password</button>
    
          </center>
    </div>




</div>

     );
}