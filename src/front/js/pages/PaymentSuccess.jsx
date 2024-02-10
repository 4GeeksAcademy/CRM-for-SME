import React from 'react';
import Logo from "../../img/Logo.png"

const PaymentSuccess = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5">
                        <div className="card-body">
                            <img className="mx-auto d-block" style={{ width: 300, height: 300 }} src={Logo} alt="CRM Logo" />
                            <h3 className="card-title text-center">Payment Successful!</h3>
                            <p className="card-text text-center">Thank you for your payment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
