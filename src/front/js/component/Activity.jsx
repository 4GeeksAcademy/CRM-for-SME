import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"
import "../../styles/activity.css";

export const Activity = (props) => {
    const { store, actions } = useContext(Context);
    const [state, setState] = useState([]);
    
    useEffect(() => {
        actions.getNotes();
        actions.getTasks();
        // actions.getPayments();
        actions.getInvoices();
    }, []);
    
    const filteredNotes = store.notes.filter(note => note.client_id === props.clientId).map(note => [note.date_created,note.type = 'Note']);
    const filteredTasks = store.tasks.filter(task => task.client_id === props.clientId).map(task => [task.date_created, task.type = "Task"] );
    const filteredPayments = store.payments.filter(payment => payment.client_id === props.clientId).map(payment => [payment.date_created,payment.type = 'Payment']);;
    const filteredInvoices= store.invoices.filter(invoice => invoice.client_id === props.clientId).map(invoice => [invoice.date_created,invoice.type = 'Invoice']);;

    const completeActivity = [...filteredNotes, ...filteredTasks,...filteredPayments, ...filteredInvoices ]


    console.log(completeActivity)


    return (

        <>
        
        <div className="container">
            <ul className="row d-flex flex-column justify-content-center align-items-center my-2">
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
