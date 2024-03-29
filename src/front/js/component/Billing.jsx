import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/billing.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Billing = props => {
	const { actions, store } = useContext(Context);
	const navigate = useNavigate();
	const filteredInvoices = store.invoices.filter(invoice => invoice.client_id === props.clientId);
	const filteredCollected = store.payments.filter(payment => payment.client_id === props.clientId);
	const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);
	const [totalCollectedAmount, setTotalCollectedAmount] = useState(0);
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		actions.getInvoices();
		actions.getPayments();
		actions.isLogged();
		if (!store.loggedIn) {
			navigate('/');
			Swal.fire({
				icon: "info",
				title: "Alert",
				text: "Your session has expired. Please log in"
			});
		}
	}, [store.token]);


	useEffect(() => {
		const invoiceAmountSum = filteredInvoices.reduce((total, invoice) => total + invoice.amount, 0);
		setTotalInvoiceAmount(invoiceAmountSum);

		const collectedAmountSum = filteredCollected.reduce((total, payment) => total + payment.amount, 0);
		setTotalCollectedAmount(collectedAmountSum);

		setBalance(invoiceAmountSum - collectedAmountSum);
	}, [filteredInvoices, filteredCollected]);

	return (
		<>
			<div className="container d-flex flex-column">
				<div className="container-fluid row border border-black p-5 text-center my-2 rounded mainBox">
					<div className="col-4 d-flex flex-column">
						<h4>{totalInvoiceAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
						<span>Total Invoice </span>
					</div>
					<div className="col-4 d-flex flex-column">
						<h4>{totalCollectedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
						<span>Total Collected </span>
					</div>
					<div className="col-4 d-flex flex-column">
						<h4>{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h4>
						<span>Balance </span>
					</div>
				</div>
				<div className="container d-flex justify-content-between my-3">
					<button type="button" className="btn btn-danger" onClick={() => props.onAddInvoice()}>Add Invoice</button>
					<button type="button" className="btn btn-primary" onClick={() => props.onAddPayment()}>Add payment</button>
					<button type="button" className="btn btn-warning" onClick={() => props.onAddPaymentLink()}>Create Payment Link</button>
				</div>
				<div id="billScroll">
					<div className="container row d-flex justify-content-between mb-2">
						<div className="col-6 d-flex flex-column align-items-center border border-dark bg-light rounded box">
							<h4 className="sticky-header">Invoice</h4>
							{filteredInvoices.map((invoice, index) => (
								<li className="border border-dark p-1 my-1 d-flex justify-content-between row bg-white rounded mx-1" key={index}>
									<div className="col-4 d-flex flex-column">
										<h5>Detail</h5>
										<span>{invoice.detail}</span>
									</div>

									<div className="col-3 d-flex flex-column">
										<h5>Amount</h5>
										<span>{invoice.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
									</div>
									<div className="col-3 d-flex flex-column">
										<h5>Invoice Date</h5>
										<span>{invoice.date_created}</span>
									</div>
									<div className="col-1 d-flex flex-column align-items-center justify-content-center cursor">
										<i className="fa-solid fa-pen mx-1" onClick={() => props.onEditInvoice(invoice)}></i>
									</div>
								</li>
							))}
						</div>
						<div className="col-6 d-flex flex-column align-items-center border border-dark bg-light rounded box">
							<h4 className="sticky-header">Collected</h4>
							{filteredCollected.map((payment, index) => (
								<li className="border border-dark p-1 my-1 d-flex justify-content-between row bg-white rounded mx-1" key={index}>
									<div className="col-4 d-flex flex-column">
										<h5>Detail</h5>
										<span>{payment.detail}</span>
									</div>
									<div className="col-3 d-flex flex-column">
										<h5>Amount</h5>
										<span>{payment.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
									</div>
									<div className="col-3 d-flex flex-column">
										<h5>Payment Date</h5>
										<span>{payment.payment_date}</span>
									</div>
									<div className="col-1 d-flex flex-column align-items-center justify-content-center cursor">
										<i className="fa-solid fa-pen mx-1" onClick={() => props.onEditPayment(payment)}></i>
									</div>
								</li>
							))}
						</div>
					</div>

				</div>
			</div>
		</>
	);
};

Billing.propTypes = {
	onAddInvoice: PropTypes.func,
	onAddPayment: PropTypes.func,
	onAddPaymentLink: PropTypes.func,
	onEditInvoice: PropTypes.func,
	onEditPayment: PropTypes.func,
	clientId: PropTypes.number,
};

Billing.defaultProps = {
	onAddInvoice: null,
	onAddPayment: null,
	onAddPaymentLink: null,
	onEditInvoice: null,
	onEditPayment: null,
};

