import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'

export const ModalEditNotes = props => {
    const [inputEditNotes, setInputEditNotes] = useState("");
    const { actions } = useContext(Context);

    function handleEditNote() {
        if (!inputEditNotes) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please write a note",
            });
            return;
        }
        actions.editNote(props.note.id, inputEditNotes);
        props.onClose();
    };

    useEffect(() => {
        setInputEditNotes(props.note ? props.note.note_content : "");
    }, [props.note]);

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Note</h5>
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
                            placeholder="Edit Note"
                            onChange={e => setInputEditNotes(e.target.value)}
                            value={inputEditNotes}
                            maxLength={245}
                        />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleEditNote}>
                            Save Changes
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

ModalEditNotes.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    note: PropTypes.object
};

ModalEditNotes.defaultProps = {
    show: false,
    onClose: null,
    note: null
};
