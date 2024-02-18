import React, { useState, useContext } from "react";
import Swal from 'sweetalert2'
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalDeleteTask = props => {
    const {actions } = useContext(Context);
    
    function handleDeleteTask() {
        actions.deleteTask(props.task.id);
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
                                data-bs-dismiss="modal"
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
                            data-dismiss="modal"
                            onClick={handleDeleteTask}>
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

ModalDeleteTask.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
};

ModalDeleteTask.defaultProps = {
    show: false,
    onClose: null
};