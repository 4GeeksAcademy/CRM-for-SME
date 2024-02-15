import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Navbar } from '../component/Navbar.jsx';
import { Footer } from '../component/Footer.jsx';
import { ModalAddClient } from '../component/ModalAddClient.jsx';
import "../../styles/MainPage.css";


export const MainPage = () => {
  const { store, actions } = useContext(Context)
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [filteredClients, setFilteredClients] = useState([]);
  

  useEffect(() => {
    
    actions.getClients();
    
    
  }, []);
  
  const handleSearchChange = (searchTerm) => {
    // Filtrar la lista de clientes aquí y actualizar el estado
   let filteredList = [];
     searchTerm == ''? setFilteredClients(store.clients):
      filteredList = store.clients.filter(client =>
      client.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filteredList)
  };

  return (
    <div>
      <Navbar onSearchChange={handleSearchChange} />
      {/* Primera fila con el botón "Add Client" */}

      <div className="row m-3">
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddClientModal(true)} >
            Add Client
          </button>
        </div>
      </div>

      {/* Espacio */}
      <div className="row mb-3">
        <div className="col"></div>
      </div>

      {/* Tabla d los clientes */}
      <div className="row text-center">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col ">Client's Name</th>
                <th scope="col">Client's Email</th>
                <th scope="col">Client's Phone Number</th>
                <th scope="col">Client's Address</th>
                <th scope="col">Client's Company</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length == 0 ? 
              store.clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.full_name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.address}</td>
                  <td>{client.company}</td>
                </tr> 
              ))
                : filteredClients.map(((client) => (
                <tr key={client.id}>
                  <td>{client.full_name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.address}</td>
                  <td>{client.company}</td>
                </tr>)))
              }
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
      <ModalAddClient show={showAddClientModal} onClose={() => setShowAddClientModal(false)} />
    </div>
  );
};
