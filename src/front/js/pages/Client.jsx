import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "../../styles/client.css";
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.png"
import { Activity } from "../component/Activity.jsx";
import { Billing } from "../component/Billing.jsx";
import { Tasks } from "../component/Tasks.jsx";
import { Notes } from "../component/Notes.jsx";
import { Navbar } from "../component/Navbar.jsx";
import { Footer } from "../component/Footer.jsx";
import { ModalAddTask } from "../component/ModalAddTask.jsx"
import { ModalEditTask } from "../component/ModalEditTask.jsx"
import { ModalDeleteTask } from "../component/ModalDeleteTask.jsx"
import { ModalAddNotes } from "../component/ModalAddNotes.jsx"
import { ModalEditNotes } from "../component/ModalEditNotes.jsx"
import { ModalDeleteNote } from "../component/ModalDeleteNote.jsx"
import { ModalAddInvoice } from "../component/ModalAddInvoice.jsx"
import { ModalAddPayment } from "../component/ModalAddPayment.jsx"
import { ModalEditInvoice } from "../component/ModalEditInvoice.jsx"
import { ModalEditPayment } from "../component/ModalEditPayment.jsx"
import { ModalEditClient } from "../component/ModalEditClient.jsx"
import { ModalPaymentLink } from "../component/ModalPaymentLink.jsx"

export const Client = () => {
    const { store, actions } = useContext(Context);
    const [state, setState] = useState('Activity');
    const [active, setActive] = useState(false)
    const [showModalAddTask, setShowModalAddTask] = useState(false);
    const [showModalEditTask, setShowModalEditTask] = useState(false);
    const [showModalDeleteTask, setShowModalDeleteTask] = useState(false);
    const [showModalAddNote, setShowModalAddNote] = useState(false);
    const [showModalEditNote, setShowModalEditNote] = useState(false);
    const [showModalDeleteNote, setShowModalDeleteNote] = useState(false);
    const [showModalAddInvoice, setShowModalAddInvoice] = useState(false);
    const [showModalAddPayment, setShowModalAddPayment] = useState(false);
    const [showModalEditInvoice, setShowModalEditInvoice] = useState(false);
    const [showModalEditPayment, setShowModalEditPayment] = useState(false);
    const [showModalEditClient, setShowModalEditClient] = useState(false);
    const [showModalPaymentLink, setShowModalPaymentLink] = useState(false);

    const activeSection = (id) => {
        setState(id)

    }


    return (
        <>
            <Navbar />
            <div className="row p-0">
                <div className="col-3 border border-black p-0" style={{ height: "100vh", backgroundColor: "#b9cedff1" }}>
                    <div className="d-flex flex-column justify-content-center align-items-center h-25 border border-black">
                        <div className="d-flex align-items-center">
                            <img src={Logo} style={{ width: '100px', height: '100px' }} alt="client Avatar" />
                            <h4>Client's Name</h4>
                        </div>
                        <div className="d-flex justify-content-center">
                            <h6 className="p-1 fw-bold">Edit Client's information</h6>
                            <i className=" p-1 fa-solid fa-pen cursor" onClick={() => setShowModalEditClient(true)}></i>
                        </div>
                    </div>
                    <div className="container h-50 my-4">
                        <div className="container d-flex ween w-100">
                            <h6 className='m-1 fw-bold'>Email:</h6>
                            <p className='m-1'>John@email.com</p>
                        </div>

                        <div className="container d-flex w-100">
                            <h6 className='m-1 fw-bold'>Phone:</h6>
                            <p className='m-1'>314567890</p>
                        </div>
                        <div className="container d-flex w-100">
                            <h6 className='m-1 fw-bold'>Company:</h6>
                            <p className='m-1'>Google</p>
                        </div>
                        <div className="container d-flex  w-100">
                            <h6 className='m-1 fw-bold'>Address: </h6>
                            <p className='m-1' >John doe avenue John street Lorem ipsum dolor sit amet. </p>
                        </div>
                    </div>


                </div>
                <div className="col-9 p-0 h-100">

                    <div className="d-flex w-100 justify-content-center bg-dark pt-3">
                        <h5 className={`text-light border border-light border-bottom-0 rounded p-1 mx-2 mt-1 cursor ${state === 'Activity' ? 'active' : ''}`} onClick={() => activeSection('Activity')}>Activity</h5>
                        <h5 className={`text-light border border-light border-bottom-0 rounded p-1 mx-2 mt-1 cursor ${state === 'Tasks' ? 'active' : ''}`} onClick={() => activeSection('Tasks')} >Tasks</h5>
                        <h5 className={`text-light border border-light border-bottom-0 rounded p-1 mx-2 mt-1 cursor ${state === 'Notes' ? 'active' : ''}`} onClick={() => activeSection('Notes')} >Notes</h5>
                        <h5 className={`text-light border border-light border-bottom-0 rounded p-1 mx-2 mt-1 cursor ${state === 'Billing' ? 'active' : ''}`} onClick={() => activeSection('Billing')}>Billing</h5>

                    </div>
                    <div className="container row mb-5">
                        {state == 'Activity' ?
                            <Activity
                            /> : state == 'Tasks' ?
                                <Tasks
                                    onAddTask={() => setShowModalAddTask(true)}
                                    onEditTask={() => setShowModalEditTask(true)}
                                    onDeleteTask={() => setShowModalDeleteTask(true)}
                                /> : state == 'Notes' ?
                                    <Notes
                                        onAddNote={() => setShowModalAddNote(true)}
                                        onEditNote={() => setShowModalEditNote(true)}
                                        onDeleteNote={() => setShowModalDeleteNote(true)}
                                    /> :
                                    <Billing
                                        onAddInvoice={() => setShowModalAddInvoice(true)}
                                        onEditInvoice={() => setShowModalEditInvoice(true)}
                                        onAddPayment={() => setShowModalAddPayment(true)}
                                        onEditPayment={() => setShowModalEditPayment(true)}
                                        onAddPaymentLink={() => setShowModalPaymentLink(true)}
                                    />}
                    </div>
                </div>
            </div>
            <Footer />
            <ModalAddTask show={showModalAddTask} onClose={() => setShowModalAddTask(false)} />
            <ModalEditTask show={showModalEditTask} onClose={() => setShowModalEditTask(false)} />
            <ModalDeleteTask show={showModalDeleteTask} onClose={() => setShowModalDeleteTask(false)} />
            <ModalAddNotes show={showModalAddNote} onClose={() => setShowModalAddNote(false)} />
            <ModalEditNotes show={showModalEditNote} onClose={() => setShowModalEditNote(false)} />
            <ModalDeleteNote show={showModalDeleteNote} onClose={() => setShowModalDeleteNote(false)} />
            <ModalAddPayment show={showModalAddPayment} onClose={() => setShowModalAddPayment(false)} />
            <ModalEditPayment show={showModalEditPayment} onClose={() => setShowModalEditPayment(false)} />
            <ModalAddInvoice show={showModalAddInvoice} onClose={() => setShowModalAddInvoice(false)} />
            <ModalEditInvoice show={showModalEditInvoice} onClose={() => setShowModalEditInvoice(false)} />
            <ModalEditClient show={showModalEditClient} onClose={() => setShowModalEditClient(false)} />
            <ModalPaymentLink show={showModalPaymentLink} onClose={() => setShowModalPaymentLink(false)} />
        </>
    );
};
