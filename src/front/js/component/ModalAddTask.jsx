import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalAddTask = props => {
    const [state, setState] = useState("");
    const [inputTask, setInputTask] = useState("");
    const [inputAssignTask, setInputAssignTask] = useState("");
    const [inputDateTask, setInputDateTask] = useState("");
    const [inputTaskPriority, setInputTaskPriority] = useState("");
    const { store, actions } = useContext(Context);

    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Task</h5>
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
                    <div className="modal-body">
                        <textarea
                            type="text"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Task"
                            onChange={e => setInputTask(e.target.value)}
                            value={inputTask}
                        />
                        <select
                            className="form-control mb-1 border border-secondary"
                            onChange={e => setInputAssignTask(e.target.value)}
                            value={inputAssignTask}
                            placeholder="Assign Task">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <input
                            type="date"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Task date"
                            onChange={e => setInputDateTask(e.target.value)}
                            value={inputDateTask}
                        />
                        <select
                            className="form-control mb-1 border border-secondary"
                            onChange={e => setInputAssignTask(e.target.value)}
                            value={inputAssignTask}
                            placeholder="Assign Task">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={() => {
                                props.onClose();
                            }}>
                            Add Client
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

ModalAddTask.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
};

ModalAddTask.defaultProps = {
    show: false,
    onClose: null
};