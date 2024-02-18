import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalEditPayment = props => {
    const [inputDetail, setInputDetail] = useState("");
    const [inputAmount, setInputAmount] = useState("");
    const [inputDate, setInputDate] = useState("");
    const { store, actions } = useContext(Context);

    useEffect(() => {
        setInputDetail(props.payment ? props.payment.detail : "");
        setInputAmount(props.payment ? props.payment.amount : "");
        if (props.payment && props.payment.payment_date) {
            const [day, month, year] = props.payment.payment_date.split("-");
            setInputDate(`${year}-${month}-${day}`);
        } else {
            setInputDate("");
        }
    }, [props.payment]);

    const handleEditPayment = async () => {
        await actions.editPayment(props.payment.id, inputAmount, inputDetail, inputDate);
        props.onClose();
    };

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
                        />
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Amount</label>
                        <input
                            type="number"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Amount"
                            onChange={e => setInputAmount(e.target.value)}
                            value={inputAmount}
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
                            onClick={handleEditPayment}>
                            Save Changes
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
    payment: PropTypes.object
};

ModalEditPayment.defaultProps = {
    show: false,
    onClose: null,
    payment: null
};