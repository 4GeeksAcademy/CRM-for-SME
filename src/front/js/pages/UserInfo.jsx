import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export const UserInfo = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getInfo();
        actions.isLogged();
        if (!store.loggedIn) {
            navigate("/");
            Swal.fire({
                icon: "info",
                title: "Alert",
                text: "Your session has expired. Please log in"
            });
        }
    }, [store.token]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h5 className="h2 fw-bold">User info</h5>
                        </div>
                        <div className="card-body text-center">
                            <h4 className="fw-bold">Name</h4>
                            <p>{store.userInfo}</p>
                            <div className="mt-3">
                                <Link to={'/changepassword'}>
                                    <button className="btn btn-sm btn-secondary text-truncate">Change password</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
