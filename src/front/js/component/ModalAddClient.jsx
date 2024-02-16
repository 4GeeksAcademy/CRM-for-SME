import React, { useState, useContext } from "react";
import Swal from 'sweetalert2'
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalAddClient = props => {
    const [inputFullName, setInputFullName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [inputCompany, setInputCompany] = useState("");
    const { store, actions } = useContext(Context);

    function handleAddClient() {
        if (!inputFullName || !inputEmail || !inputPhone) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Full name, email, and phone number are required",
            });
            return;
        }
        actions.addClient(inputFullName, inputEmail, inputPhone, inputAddress, inputCompany);
        props.onClose();
        setInputFullName("");
        setInputEmail("");
        setInputPhone("");
        setInputAddress("");
        setInputCompany("");
    }

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add client</h5>
                        {props.onClose ? (
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => props.onClose()}
                            ></button>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Full name"
                            onChange={e => setInputFullName(e.target.value)}
                            value={inputFullName}
                        />
                        <input
                            type="email"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Email"
                            onChange={e => setInputEmail(e.target.value)}
                            value={inputEmail}
                        />
                        <input
                            type="text"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Phone number"
                            onChange={e => setInputPhone(e.target.value)}
                            value={inputPhone}
                        />
                        <input
                            type="text"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Address"
                            onChange={e => setInputAddress(e.target.value)}
                            value={inputAddress}
                        />
                        <input
                            type="text"
                            className="form-control border border-secondary"
                            placeholder="Company"
                            onChange={e => setInputCompany(e.target.value)}
                            value={inputCompany}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleAddClient()}>
                            Add Client
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => props.onClose()}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ModalAddClient.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
};

ModalAddClient.defaultProps = {
    show: false,
    onClose: null
};