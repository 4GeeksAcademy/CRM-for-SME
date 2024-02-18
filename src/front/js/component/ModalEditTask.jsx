import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalEditTask = props => {
    const [inputEditarTask, setInputEditarTask] = useState("");
    const [inputUserAssignTask, setInputUserAssignTask] = useState("");
    const [inputDateTask, setInputDateTask] = useState("");
    const [inputTaskPriority, setInputTaskPriority] = useState("");
    const { store, actions } = useContext(Context);
    const handleEditTask = async () => {
        await actions.editTask(props.task.id, inputEditarTask, inputDateTask, props.task.status, inputTaskPriority, inputUserAssignTask);
        props.onClose();
    };

    useEffect(() => {
        setInputEditarTask(props.task ? props.task.title : "");
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
                            placeholder="Editar Task"
                            onChange={e => setInputEditarTask(e.target.value)}
                            value={inputEditarTask}
                        />
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Assign Task</label>
                        <select
                            className="form-control mb-1 border border-secondary"
                            onChange={e => setInputUserAssignTask(e.target.value)}
                            value={inputUserAssignTask}
                            placeholder="Assign Edit Task">
                            <option></option>
                            {store.userNames.map((user, key) => <option key={key}>{user}</option>)}
                        </select>
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Date</label>
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