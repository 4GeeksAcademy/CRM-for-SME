import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/billing.css";
import PropTypes from "prop-types";

export const Billing = props => {
	const { store, actions } = useContext(Context);
    const [state, useState] = ('')    

	return (
       <>
    <div className="container d-flex flex-column">
        <div className="container-fluid row border border-black p-5 text-center my-2 rounded mainBox">
            <div className="col-4 d-flex flex-column">
                <h4>1000$</h4>
                <span>Total Invoice </span>
            </div>
            <div className="col-4 d-flex flex-column">
                <h4>2000$</h4>
                <span>Total Collected </span>
            </div>
            <div className="col-4 d-flex flex-column">
                <h4>4000$</h4>
                <span>Balance </span>
            </div>
        </div>
        <div className="container d-flex justify-content-between my-3">
            <button type="button" className="btn btn-danger" onClick={() => props.onAddInvoice()}>Add Invoice</button>
            <button type="button" className="btn btn-primary" onClick={() => props.onAddPayment()}>Add payment</button>
            <button type="button" className="btn btn-warning" onClick={() => props.onAddPaymentLink()}>Create Payment Link</button>
        </div>
        <div className="container row d-flex justify-content-between my-2">
            <div className="ocol-6 d-flex flex-column align-items-center border border-dark bg-light rounded box">
                <h4>Invoice</h4>
                <li className="border border-dark p-1 my-1 d-flex justify-content-between row bg-white rounded mx-1 ">
                    <div className="col-4 d-flex flex-column">
                        <h5>Detail</h5>   
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>   
                    </div>                                   
                        
                    <div className="col-2 d-flex flex-column">
                        <h5>Amount</h5>   
                        <span>1000$</span>   
                    </div>    
                    <div className="col-4 d-flex flex-column">
                        <h5>Date Created</h5>   
                        <span>1/1/2024</span>   
                    </div> 
                    <div className="col-1 d-flex flex-column aling-items-center justify-content-center cursor">
                        <i className="fa-solid fa-pen mx-1" onClick={() => props.onEditInvoice()}></i>  
                    </div>  
                </li>
                <li className="border border-dark p-1 my-1 d-flex justify-content-between row bg-white rounded mx-1">
                    <div className="col-4 d-flex flex-column">
                        <h5>Detail</h5>   
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>   
                    </div>                                   
                    <div className="col-2 d-flex flex-column">
                        <h5>Amount</h5>   
                        <span>1000$</span>   
                    </div>    
                    <div className="col-4 d-flex flex-column">
                        <h5>Date Created</h5>   
                        <span>1/1/2024</span>   
                    </div> 
                    <div className="col-1 d-flex flex-column aling-items-center justify-content-center cursor">
                        <i className="fa-solid fa-pen mx-1" onClick={() => props.onEditInvoice()}></i>  
                    </div>   
                </li>             
            </div>
            <div className="col-6 d-flex flex-column align-items-center border border-dark bg-light rounded box">
                <h4>Collected</h4>
                <li className="border border-dark p-1 my-1 d-flex justify-content-between row bg-white rounded mx-1">
                    <div className="col-4 d-flex flex-column">
                        <h5>Detail</h5>   
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>   
                    </div>                                    
                    <div className="col-2 d-flex flex-column">
                        <h5>Amount</h5>   
                        <span>1000$</span>   
                    </div>    
                    <div className="col-4 d-flex flex-column">
                        <h5>Date Created</h5>   
                        <span>1/1/2024</span>   
                    </div>
                    <div className="col-1 d-flex flex-column aling-items-center justify-content-center cursor">
                        <i className="fa-solid fa-pen mx-1" onClick={() => props.onEditInvoice()}></i>  
                    </div>     
                </li>
                <li className="border border-dark p-1 my-1 d-flex justify-content-between row bg-white  rounded mx-1">
                    <div className="col-4 d-flex flex-column">
                        <h5>Detail</h5>   
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</span>   
                    </div>                                   
                        
                    <div className="col-2 d-flex flex-column">
                        <h5>Amount</h5>   
                        <span>1000$</span>   
                    </div>    
                    <div className="col-4 d-flex flex-column">
                        <h5>Date Created</h5>   
                        <span>1/1/2024</span>   
                    </div> 
                    <div className="col-1 d-flex flex-column aling-items-center justify-content-center cursor">
                        <i className="fa-solid fa-pen mx-1" onClick={() => props.onEditInvoice()}></i>  
                    </div>   
                </li>
            </div>
        </div>
    </div>
       </>
    );
};
Billing.propTypes = {
	onAddInvoice: PropTypes.func,
	onAddPayment: PropTypes.func,
	onAddMercadoPago: PropTypes.func,
	onEditInvoice: PropTypes.func,
	onEditPayment: PropTypes.func,
};

Billing.defaultProps = {
	onAddInvoice: null,
	onAddPayment: null,
	onAddMercadoPago: null,
	onEditInvoice: null,
	onEditPayment: null,
};