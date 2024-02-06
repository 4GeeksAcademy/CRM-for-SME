import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalEditPayment = props => {
    const [state, setState] = useState("");
    const [inputDetalles,setInputDetalles] = useState("");
    const [inputTextAmount, setInputTextAmount] = useState("");
    const [inputDate, setInputDate] = useState("");
    const { store, actions } = useContext(Context);

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Payment </h5>
                        {props.onClose ? (
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => props.onClose()}
                            ></button>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="modal-body">
                        <textarea
                            type="text"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Detail"
                            onChange={e => setInputDetalles(e.target.value)}
                            value={inputDetalles}
                        />
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Amount</label>
                        <input 
                                type="number"
                                className="form-control mb-1 border border-secondary" 
                                placeholder="Amount"
                                onChange={e => setInputTextAmount(e.target.value)}
								value={inputTextAmount} 
                            />
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Date</label>
                        <input
                            type="date"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Task date"
                            onChange={e => setInputDate(e.target.value)}
                            value={inputDate}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={() => {
                                props.onClose();
                            }}>
                           Edit Payment
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

ModalEditPayment.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
};

ModalEditPayment.defaultProps = {
    show: false,
    onClose: null
};