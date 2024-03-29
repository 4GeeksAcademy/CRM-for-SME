import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/tasks.css";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Tasks = props => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const filteredTask = store.tasks.filter(task => task.client_id === props.clientId);
    const [status, setStatus] = useState('')
    const [taskId, setTaskId] = useState('')
    
    useEffect(() => {
        actions.getTasks();
        actions.isLogged();
        if (!store.loggedIn) {
            navigate('/');
            Swal.fire({
                icon: "info",
                title: "Alert",
                text: "Your session has expired. Please log in"
            });
        }
        
    }, [store.loggedIn]);
   
   const handleStatus = (id) =>{        
    const updatedTask = filteredTask.find(task => task.id === id);
    const updatedStatus = updatedTask.status === 'Pending' ? 'Done' : 'Pending';
    actions.taskAsDone(id, updatedStatus)
    
   }

   

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center m-4 row">

            <div className="col-12 d-flex justify-content-end align-items-end">
                <button type="button" className="btn btn-primary" onClick={() => props.onAddTask()}>Add Task</button>
            </div>

            <ul id="taskScroll">
                {filteredTask.map((task, index) => {
                    return (
                        <li className="border border-dark p-2 my-2 d-flex justify-content-between row bg-light" key={index}>
                            <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold">User Asign</h5>
                                <span>{task.user_name}</span>
                            </div>

                            <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold" >Task title</h5>
                                <span>{task.title}</span>
                            </div>

                            <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold" >Due Date</h5>
                                <span>{task.due_date}</span>
                            </div>

                            <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold" >Priority</h5>
                                <span className={task.priority === "Low" ? 'text-success' : task.priority === "Medium" ? 'text-warning' : 'text-danger'}>{task.priority}</span>
                            </div>

                            <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                                <h5 className="fw-bold">Status</h5>
                                <button type="button" className={task.status == 'Pending' ? 'btn btn-secondary' : 'btn btn-success'} onClick={() => handleStatus(task.id) }>{task.status == 'Pending' ? 'Pending' : 'Done'}</button>
                            </div>

                            <div className="col-1 d-flex align-items-center">
                                <i className="fa-solid fa-pen mx-1 cursor" onClick={() => props.onEditTask(task)}></i>
                                <i className="fa-solid fa-trash mx-1 cursor" onClick={() => props.onDeleteTask(task)}></i>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

Tasks.propTypes = {
	onAddTask: PropTypes.func,
	onEditTask: PropTypes.func,
	onDeleteTask: PropTypes.func,
};

Tasks.defaultProps = {
	onAddTask: null,
	onEditTask: null,
	onDeleteTask: null,
};