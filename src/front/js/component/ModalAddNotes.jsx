import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'

export const ModalAddNotes = props => {
    const [inputNote, setInputNote] = useState("");
    const { actions } = useContext(Context);

    function handleAddNote() {
        if (!inputNote) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please write a note",
            });
            return;
        }
        actions.addNote(inputNote, props.clientId);
        props.onClose();
        setInputNote("");
    } 

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Note</h5>
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
                            placeholder="Write Note"
                            onChange={e => setInputNote(e.target.value)}
                            value={inputNote}
                            maxLength={245}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleAddNote()}>
                            Add Note
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

ModalAddNotes.propTypes = {
    onClose: PropTypes.func,
    clientId: PropTypes.number.isRequired,
};

ModalAddNotes.defaultProps = {
    show: false,
    onClose: null
};