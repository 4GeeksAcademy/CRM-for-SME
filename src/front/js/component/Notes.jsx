import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/notes.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Notes = props => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const filteredNotes = store.notes.filter(note => note.client_id === props.clientId);

    useEffect(() => {
        actions.getNotes();
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

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center m-4 row">
            <div className="col-12 d-flex justify-content-end align-items-end">
                <button type="button" className="btn btn-primary" onClick={() => props.onAddNote()}>Add Note</button>
            </div>
            <ul className="mt-1" id="noteScroll">
                {filteredNotes.map((note, index) => {
                    return (
                        <li className="border border-dark p-2 my-2 d-flex row bg-light" key={index}>
                            <span className="col-8">{note.note_content}</span>
                            <div className="row col-4">
                                <div className="col-5 d-flex flex-column">
                                    <h6 className="fw-bold">User</h6>
                                    <span>{note.user_id}</span>
                                </div>
                                <div className="col-5 d-flex flex-column">
                                    <h6 className="fw-bold" >Date Created</h6>
                                    <span>{note.date_created}</span>
                                </div>
                                <div className="col-2 d-flex align-items-center">
                                    <i className="fa-solid fa-pen mx-1 cursor" onClick={() => props.onEditNote(note)}></i>
                                    <i className="fa-solid fa-trash mx-1 cursor" onClick={() => props.onDeleteNote(note)}></i>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

Notes.propTypes = {
    onAddNote: PropTypes.func,
    onEditNote: PropTypes.func,
    onDeleteNote: PropTypes.func,
};

Notes.defaultProps = {
    onAddNote: null,
    onEditNote: null,
    onDeleteNote: null,
};