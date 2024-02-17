import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'
import background from "../../img/background.png"
import "../../styles/signup.css"
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [inputUser, setInputUser] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");
    function save() {
        actions.postSignUp(inputUser, inputEmail, inputPassword);
        navigate('/');
    }

    useEffect(() => {
        actions.isLogged();
        if (store.loggedIn) {
          navigate("/home");
        }
      }, [store.token]);

    return (
        <div className="container">
                <div className="row">
                    <div className="col col-xs-1">
                        <div className="body" style={{ backgroundImage: `url(${background})` }}>
                            <div className="text-center justify-content-center d-md-flex m-5">
                                <div className="form-signin">
                                    <form className="text-center container justify-content-center">
                                        <div className="form-floating m-1">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="userName"
                                                placeholder="User name"
                                                onChange={e => setInputUser(e.target.value)}
                                                value={inputUser}
                                            />
                                            <label htmlFor="userName">User name</label>
                                        </div>
                                        <div className="form-floating m-1">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="name@example.com"
                                                onChange={e => setInputEmail(e.target.value)}
                                                value={inputEmail}
                                            />
                                            <label htmlFor="email">Email address</label>
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
                                        <div className="form-floating m-1">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPassword"
                                                placeholder="Confirm password"
                                                onChange={e => setInputConfirmPassword(e.target.value)}
                                                value={inputConfirmPassword}
                                            />
                                            <label htmlFor="confirmPassword">Confirm password</label>
                                        </div>
                                        <div>
                                            <button
                                                className="w-100 btn btn-sm btn-primary mb-5"
                                                type="button"
                                                onClick={() => {
                                                    if (inputPassword !== inputConfirmPassword) {
                                                        Swal.fire({
                                                            icon: "info",
                                                            title: "Alert",
                                                            text: "Please confirm your password to continue",
                                                        });
                                                    } else if (
                                                        inputUser !== "" &&
                                                        inputEmail !== "" &&
                                                        inputPassword !== "" &&
                                                        inputConfirmPassword !== ""
                                                    ) {
                                                        save();
                                                    } else {
                                                        Swal.fire({
                                                            icon: "error",
                                                            title: "Error",
                                                            text: "Please fill out all input fields",
                                                        });
                                                    }
                                                }}
                                            >
                                                Create User
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}