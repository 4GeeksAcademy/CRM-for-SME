import React, { useContext, useState } from "react";
import Swal from 'sweetalert2';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import background from "../../img/background.png";
import "../../styles/login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [inputUser, setInputUser] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  function save() {
    actions.postLogin(inputUser, inputPassword);
    navigate("/home");
  }

  return (
    <div className="container ">
      {store.loggedIn ? (
        navigate("/home")
      ) : (
        <div className="row">
          <div className="col col-xs-1">
            <div className="body" style={{ backgroundImage: `url(${background})` }}>
              <div className="text-center justify-content-center d-md-flex m-5">
                <div className="form-signin">
                  <form className="text-center">
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
                        className="w-100 btn btn-sm btn-primary"
                        type="button"
                        onClick={() => {
                          if (inputUser !== "" && inputPassword !== "") {
                            save();
                          } else {
                            Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: "Please fill out all input fields",
                            });
                          }
                        }}>Log in
                      </button>
                      <button
                        className="w-100 btn btn-sm btn-secondary"
                        type="button"
                        onClick={() => navigate("/signup")}
                      >Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
