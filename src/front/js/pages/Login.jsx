import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/Logo.png"


export const Login = () => {
  const navigate = useNavigate()
	const { store, actions } = useContext(Context);
  const [inputUser, setInputUser] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  function save() {
		actions.postLogin(inputUser, inputPassword);
	}

	return (
    <div>
      {store.loggedIn ? (navigate("/home")): (
        <div className="text-center justify-content-center d-md-flex m-5"> 
        <div className="form-signin">
            <form className="text-center container justify-content-center">
            <img style={{ width: 300, height: 300 }} src={Logo} alt="CRM Logo" /> 
              <h1 className="h2 mb-3 fw-normal">Please log in</h1>
              <div className="form-floating m-1">
                <input 
                      type="text" 
                      className="form-control" 
                      id="user" 
                      placeholder="User name"
                      onChange={e => setInputUser(e.target.value)}
                      value={inputUser}
                />
                <label htmlFor="user">User name</label>
              </div>
              <div className="form-floating m-1">
                <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      placeholder="Password"
                      onChange={e => setInputPassword(e.target.value)}
                      value={inputPassword} 
                />
              <label htmlFor="password">Password</label>
              </div>
              <div>
                <button 
                      className="w-100 btn btn-sm btn-primary m-1" 
                      type="button"
                      onClick={() => {
                        if (inputUser != "" && inputPassword != "") {
                          save();
                        } else {
                          alert("Please fill out all input fields");
                        }
                      }}>Log in</button>
                 <Link 
                      to={'/signup'}
                      className="w-100 btn btn-sm btn-secondary m-1" 
                      type="button"
                      >Sign Up</Link>
              </div>
            </form>
        </div>
      </div>
      )}
    </div>    
	);
};