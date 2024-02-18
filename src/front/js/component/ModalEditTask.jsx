import React, { useState, useContext, useEffect } from "react";
import Swal from 'sweetalert2'
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalEditTask = props => {
    const [inputTitleTask, setInputTitleTask] = useState("");
    const [inputUserAssignTask, setInputUserAssignTask] = useState("");
    const [inputDateTask, setInputDateTask] = useState("");
    const [inputTaskPriority, setInputTaskPriority] = useState("");
    const { store, actions } = useContext(Context);
    
    function handleEditTask() {
        if (!inputTitleTask || !inputDateTask|| !inputTaskPriority || !inputUserAssignTask ) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill out all input fields",
            });
            return;
        }
        actions.editTask(props.task.id, inputTitleTask, inputDateTask, props.task.status, inputTaskPriority, inputUserAssignTask);
        props.onClose();
    };

    useEffect(() => {
        setInputTitleTask(props.task ? props.task.title : "");
        setInputUserAssignTask(props.task ? props.task.user_name : "");
        setInputTaskPriority(props.task ? props.task.priority : "");
        if (props.task && props.task.due_date) {
            const [day, month, year] = props.task.due_date.split("-");
            setInputDateTask(`${year}-${month}-${day}`);
        } else {
            setInputDateTask("");
        }
    }, [props.task]);



    return (
        <div className="modal bg-secondary py-5" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Task</h5>
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
                            placeholder="Task title"
                            onChange={e => setInputTitleTask(e.target.value)}
                            value={inputTitleTask}
                            maxLength={100}
                            rows={1}
                        />
                        <label className="form-label d-flex justify-content-start align-items-start">Assign Task</label>
                        <select
                            className="form-control mb-1 border border-secondary"
                            onChange={e => setInputUserAssignTask(e.target.value)}
                            value={inputUserAssignTask}
                            placeholder="Assign Edit Task">
                            <option></option>
                            {store.userNames.map((user, key) => <option key={key}>{user}</option>)}
                        </select>
                        <label className="form-label d-flex justify-content-start align-items-start">Date</label>
                        <input
                            type="date"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Edit date"
                            onChange={e => setInputDateTask(e.target.value)}
                            value={inputDateTask}
                        />
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Priority</label>
                        <select
                            id="priority"
                            className="form-control mb-1 border border-secondary"
                            onChange={e => setInputTaskPriority(e.target.value)}
                            value={inputTaskPriority}
                            placeholder="Task Edit Priority">
                            <option></option>
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
                            onClick={handleEditTask}>
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

ModalEditTask.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
};

ModalEditTask.defaultProps = {
    show: false,
    onClose: null
};