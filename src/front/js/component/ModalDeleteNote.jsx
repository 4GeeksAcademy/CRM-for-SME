import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalDeleteNote = props => {
    const { actions } = useContext(Context);

    const handleDeleteNote = async () => {
        await actions.deleteNote(props.note.id);
        props.onClose();
    };

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Item</h5>
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
                    <p className="p-2 text-center">Are you sure?</p>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleDeleteNote}>
                            Yes
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => props.onClose()}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ModalDeleteNote.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    note: PropTypes.object
};

ModalDeleteNote.defaultProps = {
    show: false,
    onClose: null,
    note: null
};
