import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalEditInvoice = props => {
    const [inputDetail, setInputDetail] = useState("");
    const [inputAmount, setInputAmount] = useState("");
    const { actions } = useContext(Context);

    useEffect(() => {
        setInputDetail(props.invoice ? props.invoice.detail : "");
        setInputAmount(props.invoice ? props.invoice.amount : "");
    }, [props.invoice]);

    const handleEditInvoice = async () => {
        await actions.editInvoice(props.invoice.id, inputAmount, inputDetail);
        props.onClose();
    };

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Invoice</h5>
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
                            onClick={handleEditInvoice}
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => props.onClose()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ModalEditInvoice.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    invoice: PropTypes.object
};

ModalEditInvoice.defaultProps = {
    show: false,
    onClose: null,
    invoice: null
};
