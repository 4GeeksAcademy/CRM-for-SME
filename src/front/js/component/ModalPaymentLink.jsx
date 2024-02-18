import React, { useState } from 'react';
import PropTypes from "prop-types";
import Swal from 'sweetalert2'

export const ModalPaymentLink = props => {
    const [paymentUrl, setPaymentUrl] = useState('');
    const [productName, setProductName] = useState('');
    const [unitAmount, setUnitAmount] = useState('');

    const handleSubmit = () => {

        const requestData = {
            name: productName,
            unit_amount: unitAmount
        };
        fetch(process.env.BACKEND_URL + '/api/payment-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                setPaymentUrl(data.payment_url);

            })
            .catch(error => console.error('Error generating payment link:', error));
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(paymentUrl)
            .then(() => {
                console.log('Payment URL copied to clipboard');
            })
            .catch(error => {
                console.error('Error copying payment URL to clipboard:', error);
            });
    };

    const handleUnitAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setUnitAmount(value);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter a valid number',
            });
        }
    };

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create a payment Link</h5>
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
                        <label htmlFor="Product Name" className="form-label d-flex justify-content-start align-items-start">Product Name</label>
                        <input
                            id='Product Name'
                            type="text"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Product Name"
                            onChange={e => setProductName(e.target.value)}
                            value={productName}
                            maxLength={27}
                        />
                        <label htmlFor="Unit Amount" className="form-label d-flex justify-content-start align-items-start">Unit Amount in cents (minimun 100)</label>
                        <input
                            id='Unit Amount'
                            type="text"
                            className="form-control mb-1 border border-secondary"
                            onChange={handleUnitAmountChange}
                            value={unitAmount}
                        />
                    </div>
                    <div className="modal-footer">
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary m-1"
                                data-dismiss="modal"
                                onClick={() => {
                                    if (unitAmount < 100) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Error",
                                            text: "The minimum amount is 100",
                                        });
                                    }
                                    else if (productName != "" && unitAmount != "") {
                                        handleSubmit();
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Error",
                                            text: "Please fill out all input fields",
                                        });
                                    }
                                }}>
                                Generate Payment Link
                            </button>
                            <button type="button" className="btn btn-secondary m-1" onClick={() => props.onClose()}>
                                Cancel
                            </button>
                        </div>
                        <div>
                            {paymentUrl && (
                                <a className='btn btn-outline-info m-1' href={paymentUrl} target="_blank">Go to payment page</a>
                            )}
                            {paymentUrl && (
                                <button type="button" className="btn btn-outline-success m-1" onClick={handleCopyUrl}>Copy URL</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ModalPaymentLink.propTypes = {
    onClose: PropTypes.func,

};

ModalPaymentLink.defaultProps = {
    show: false,
    onClose: null
};