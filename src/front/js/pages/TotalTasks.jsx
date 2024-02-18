import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navbar } from '../component/Navbar.jsx';
import { Footer } from '../component/Footer.jsx';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../styles/totaltasks.css";

export const TotalTasks = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.isLogged();
        actions.getTasks(); 
      }, []);
    
      useEffect(() => {
        actions.isLogged();
        if (!store.loggedIn) {
          navigate('/');
        }
      }, [store.loggedIn]);
    
    return (

        <div>
            <Navbar page="Tasks" />
            <div id="tasksHead" className="text-center">
                <h1>Total Tasks</h1>
            </div>

            <ul id="taskscontent">
                {store.tasks.map((task, index) => (
                    <li className="border border-dark p-2 my-2 d-flex justify-content-between row bg-light" key={index}>
                        <div className="col-2 d-flex flex-column">
                            <h5 className="fw-bold" >Task title</h5>
                            <span>{task.title}</span>
                        </div>
                        <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold">User Asign</h5>
                                <span>{task.user_name}</span>
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
                            <button type="button" className={task.status == 'Incomplete' ? 'btn btn-secondary' : 'btn btn-success'}>{task.status}</button>
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