import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";
import { Link } from "react-router-dom";
import { AgendaSelector } from "../components/AgendaSelector"; // Importación faltante

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    if (store.currentAgenda) {
      fetch(`https://playground.4geeks.com/contact/agendas/${store.currentAgenda}/contacts`)
        .then(res => {
          if (!res.ok) throw new Error("Error cargando contactos: " + res.status);
          return res.json();
        })
        .then(data => {
          // Extraer los contactos de la propiedad 'results'
          const contacts = Array.isArray(data.contacts) ? data.contacts : [];
          console.log("Contactos recibidos:", contacts); // Debug
          dispatch({ type: "LOAD_CONTACTS", payload: contacts });
          console.log("Respuesta completa:", data);
        })
        .catch(error => {
          console.error("Error en la solicitud:", error);
          dispatch({ type: "LOAD_CONTACTS", payload: [] });
        });
    }
  }, [store.currentAgenda]);

  if (!store.currentAgenda) {
    return <AgendaSelector />; // Ahora está correctamente importado
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h1>Contacts - {store.currentAgenda}</h1>
        <div className="d-flex gap-2">
          <Link to="/add-contact" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            Add Contact
          </Link>
          <button 
            className="btn btn-secondary"
            onClick={() => dispatch({ type: "SET_AGENDA", payload: null })}
          >
            Change Agenda
          </button>
        </div>
      </div>
      
      {/* Protección adicional contra datos no array */}
      {Array.isArray(store.contacts) && store.contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      
      {/* Mensaje para agenda vacía */}
      {Array.isArray(store.contacts) && store.contacts.length === 0 && (
        <div className="alert alert-info mt-3">
          No contacts found in this agenda.{" "}
          <Link to="/add-contact" className="alert-link">
            Create your first contact
          </Link>
        </div>
      )}
    </div>
  );
};