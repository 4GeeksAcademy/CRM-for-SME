import React, { useState, useEffect } from 'react';
import { Navbar } from '../component/Navbar.jsx';
import { Footer } from '../component/Footer.jsx';
import { ModalAddClient } from '../component/ModalAddClient.jsx';

export const MainPage = () => {
  const [clients, setClients] = useState([]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  // Función para obtener la lista de clientes 
  const fetchClients = async () => {
    try {

      const response = await fetch('https://api.example.com/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    // Llama a la función de obtener clientes al cargar la página
    fetchClients();
  }, []);

  return (
    <div>
      <Navbar />
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
                <th scope="col ">Clients Name</th>
                <th scope="col">Clients Email</th>
                <th scope="col">Clients Phone Number</th>
                <th scope="col">Clients Company</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    <Footer /> 
    <ModalAddClient show={showAddClientModal} onClose={() => setShowAddClientModal(false)} />           
    </div>
  );
};
