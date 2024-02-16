import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from '../component/Navbar.jsx';
import { Footer } from '../component/Footer.jsx';
import PropTypes from "prop-types";

export const TotalTasks = (props) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        
        actions.getAllTasksForTotal();
    }, []);
    return (

        <div>
            <Navbar page="Tasks" />
            <div className="text-center">
                <h1>Total Tasks</h1>
            </div>

            <ul>
                {store.tasks.map((task, index) => (
                    <li className="border border-dark p-2 my-2 d-flex justify-content-between row bg-light" key={index}>
                        <div className="col-2 d-flex flex-column">
                            <h5 className="fw-bold">User Asign</h5>
                            <span>{task.userAsing}</span>
                        </div>

                        <div className="col-2 d-flex flex-column">
                            <h5 className="fw-bold" >Task title</h5>
                            <span>{task.title}</span>
                        </div>

                        <div className="col-2 d-flex flex-column">
                            <h5 className="fw-bold" >Due Date</h5>
                            <span>{task.dueDate}</span>
                        </div>

                        <div className="col-2 d-flex flex-column">
                            <h5 className="fw-bold" >Priority</h5>
                            <span className={task.priority === "Low" ? 'text-success' : task.priority === "Medium" ? 'text-warning' : 'text-danger'}>{task.priority}</span>
                        </div>

                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                            <h5 className="fw-bold">Status</h5>
                            <button type="button" className={task.complete == false ? 'btn btn-secondary' : 'btn btn-success'} onClick={() => actions.taskAsDone(task.idTask)}>{task.complete == false ? 'Pending' : 'Completed'}</button>
                        </div>

                        
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
};

TotalTasks.propTypes = {
    onAddTask: PropTypes.func,
    onEditTask: PropTypes.func,
    onDeleteTask: PropTypes.func,
};

TotalTasks.defaultProps = {
    onAddTask: null,
    onEditTask: null,
    onDeleteTask: null,
};