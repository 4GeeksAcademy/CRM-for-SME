import React from "react";
import { Navbar } from '../component/Navbar.jsx';
import { Footer } from '../component/Footer.jsx';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const TotalTasks = props => {
  return (

    <div>
         <Navbar />
      <h1>TasksTotales</h1>
      {<li className="border border-dark p-2 my-2 d-flex justify-content-between row bg-light">
                            <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold">User Asign</h5>
                                {/* <span>{task.userAsing}</span> */}
                            </div>

                            <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold" >Task title</h5>
                                {/* <span>{task.title}</span> */}
                            </div>

                            <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold" >Due Date</h5>
                                {/* <span>{task.dueDate}</span> */}
                            </div>

                            <div className="col-2 d-flex flex-column">
                                <h5 className="fw-bold" >Priority</h5>
                                {/* <span className={task.priority === "Low" ? 'text-success' : task.priority === "Medium" ? 'text-warning' : 'text-danger'}>{task.priority}</span> */}
                            </div>

                            <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                                <h5 className="fw-bold">Status</h5>
                                {/* <button type="button" className={task.complete == false ? 'btn btn-secondary' : 'btn btn-success'} onClick={() => actions.taskAsDone(task.idTask)}>{task.complete == false ? 'Pending' : 'Completed'}</button> */}
                            </div>

                            <div className="col-1 d-flex">
                                <i className="fa-solid fa-pen mx-1" onClick={() => props.onEditTask()}></i>
                                <i className="fa-solid fa-trash mx-1" onClick={() => props.onDeleteTask()}></i>
                            </div>
                        </li>}
                        <Footer /> 
    </div>
  );
};
TotalTasks.propTypes = {
    onEditTask: PropTypes.func,
    onDeleteTask: PropTypes.bool,
};

// TotalTasks.defaultProps = {
//     show: false,
//     onClose: null
// };