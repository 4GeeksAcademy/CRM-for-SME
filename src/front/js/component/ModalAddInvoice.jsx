import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'

export const ModalAddInvoice = props => {
    const [inputDetail,setInputDetail] = useState("");
    const [inputAmount, setInputAmount] = useState("");
    const { store, actions } = useContext(Context);

    function handleAddInvoice() {
        if (!inputAmount || !inputDetail) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill out all input fields",
            });
            return;
        }
        actions.addInvoice(inputAmount, inputDetail, props.clientId);
        props.onClose();
        setInputDetail("");
        setInputAmount("");
    } 

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Invoice </h5>
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
                        <textarea
                            type="text"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Detail"
                            onChange={e => setInputDetail(e.target.value)}
                            value={inputDetail}
                            maxLength={27}
                            rows={1}
                        />
                        <label className="form-label d-flex justify-content-start align-items-start">Amount</label>
                        <input 
                                type="number"
                                className="form-control mb-1 border border-secondary" 
                                placeholder="Amount"
                                onChange={e => setInputAmount(e.target.value)}
								value={inputAmount} 
                            />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleAddInvoice()}>
                           Add Invoice
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

ModalAddInvoice.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
};

ModalAddInvoice.defaultProps = {
    show: false,
    onClose: null
};