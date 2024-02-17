import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ModalAddTask = props => {
    const [state, setState] = useState("");
    const [inputTitleTask, setInputTitleTask] = useState("");
    const [inputUserAssignTask, setInputUserAssignTask] = useState("");
    const [inputDateTask, setInputDateTask] = useState("");
    const [inputTaskPriority, setInputTaskPriority] = useState("");
    const [inputStatus, setinputStatus] = useState("Incomplete");
    const { store, actions } = useContext(Context);

    console.log(props)

    function handleAddTask() {
        actions.addTask(inputTitleTask,inputDateTask,inputStatus,inputTaskPriority, inputUserAssignTask, props.clientId);
        console.log(inputTitleTask,inputDateTask,inputStatus,inputTaskPriority, inputUserAssignTask, props.clientId)
        props.onClose();
        setInputTitleTask('')
        setInputUserAssignTask('')
        setInputDateTask('')
        setInputTaskPriority('')
    } 
    

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
                            placeholder="Title Task"
                            onChange={e => setInputTitleTask(e.target.value)}
                            value={inputTitleTask}
                        />
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Assign Task</label>
                        <select
                            className="form-control mb-1 border border-secondary"
                            onChange={e => setInputUserAssignTask(e.target.value)}
                            value={inputUserAssignTask}
                            placeholder="Assign Task">
                            <option selected>Select User</option>
                            {store.userNames.map((user,key) =><option key={key}>{user}</option>)}
                                        
                            
                        </select>
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Date</label>
                        <input
                            type="date"
                            className="form-control mb-1 border border-secondary"
                            placeholder="Task date"
                            onChange={e => setInputDateTask(e.target.value)}
                            value={inputDateTask}
                        />
                        <label htmlFor="priority" className="form-label d-flex justify-content-start align-items-start">Priority</label>
                        <select
                            id="priority"
                            className="form-control mb-1 border border-secondary"
                            onChange={e => setInputTaskPriority(e.target.value)}
                            value={inputTaskPriority}
                            placeholder="Task Priority">
                            <option selected>Select priority</option>  
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
                            onClick={() => {handleAddTask()}}>
                            Add Task
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
    clientId: PropTypes.number.isRequired,
};

ModalAddTask.defaultProps = {
    show: false,
    onClose: null,
   
};