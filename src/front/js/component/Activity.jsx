import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/activity.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Activity = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getNotes();
        actions.getTasks();
        actions.getPayments();
        actions.getInvoices();
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

    const filteredNotes = store.notes.filter(note => note.client_id === props.clientId).map(note => [note.date_created, note.type = 'Note']);
    const filteredTasks = store.tasks.filter(task => task.client_id === props.clientId).map(task => [task.date_created, task.type = "Task"]);
    const filteredPayments = store.payments.filter(payment => payment.client_id === props.clientId).map(payment => [payment.date_created, payment.type = 'Payment']);;
    const filteredInvoices = store.invoices.filter(invoice => invoice.client_id === props.clientId).map(invoice => [invoice.date_created, invoice.type = 'Invoice']);;

    const completeActivity = [...filteredNotes, ...filteredTasks, ...filteredPayments, ...filteredInvoices]



    return (

        <>

            <div id="activityContainer" className="container">
                <ul id="activityScroll" className="row d-flex flex-column justify-content-center align-items-center my-2">
                    {completeActivity.map((activity, index) => {
                        return (
                            <li className="border border-dark p-3 my-1 d-flex w-50 row bg-light" key={index}>
                                <span className="col-6">{activity[1]} created</span>
                                <span className="col-6">Date created: {activity[0]}</span>
                            </li>
                        );
                    })}

                </ul>

            </div>
        </>

    )
}
