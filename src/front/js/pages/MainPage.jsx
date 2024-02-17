import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Navbar } from '../component/Navbar.jsx';
import { Footer } from '../component/Footer.jsx';
import { ModalAddClient } from '../component/ModalAddClient.jsx';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/mainpage.css";

export const MainPage = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [filteredClients, setFilteredClients] = useState([]);

    useEffect(() => {
        actions.getClients();
        actions.getUser();
        actions.isLogged();
        if (!store.loggedIn) {
            navigate('/');
        }
    }, [store.loggedIn]);
    
    const handleSearchChange = (searchTerm) => {
        let filteredList = [];
        searchTerm === '' ? setFilteredClients(store.clients) :
            filteredList = store.clients.filter(client =>
                client.full_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setFilteredClients(filteredList);
    };

    return (
        <div>
            <Navbar onSearchChange={handleSearchChange} />
            {/* First row with the "Add Client" button */}
            <div className="row m-3">
                <div className="col">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAddClientModal(true)} >
                        Add Client
                    </button>
                </div>
            </div>
           
            <div className="row text-center">
                <div className="col">
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Client's Name</th>
                                    <th scope="col">Client's Email</th>
                                    <th scope="col">Client's Phone Number</th>
                                    <th scope="col">Client's Address</th>
                                    <th scope="col">Client's Company</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {filteredClients.length === 0 ?
                                    store.clients.map((client) => (
                                        <tr key={client.id}>
                                            <td><Link to={'/client/' + client.id} className='link'>{client.full_name}</Link></td>
                                            <td>{client.email}</td>
                                            <td>{client.phone}</td>
                                            <td>{client.address}</td>
                                            <td>{client.company}</td>
                                        </tr>
                                    )) :
                                    filteredClients.map(((client) => (
                                        <tr key={client.id}>
                                            <td><Link to={'/client/' + client.id} className='link'>{client.full_name}</Link></td>
                                            <td>{client.email}</td>
                                            <td>{client.phone}</td>
                                            <td>{client.address}</td>
                                            <td>{client.company}</td>
                                        </tr>
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
            <ModalAddClient show={showAddClientModal} onClose={() => setShowAddClientModal(false)} />
        </div>
    );
};

