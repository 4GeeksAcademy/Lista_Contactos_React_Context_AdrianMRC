import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContacts } from "../hooks/useContacts";
import { useAgendas } from "../hooks/useAgendas";
import { ContactCard } from "../components/ContactCard";
import { toast } from "react-toastify";

export const Contact = () => {
  const navigate = useNavigate();

  const { currentAgenda, clearCurrentAgenda } = useAgendas();
  const { contacts, loadContacts, deleteContact, loading, error } = useContacts();

  // Sin agenda seleccionada? vuelves a selector
  useEffect(() => {
    if (!currentAgenda) navigate('/agenda-selector');
    else loadContacts();
  }, [currentAgenda, loadContacts, navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      toast.success("Contacto eliminado 🗑");
    } catch(err) {
      toast.error(err.message || "Error eliminando contacto");
    }
  }

  const handleChangeAgenda = () => {
    clearCurrentAgenda();
    navigate('/agenda-selector');
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Agenda: {currentAgenda}</h1>
        <div className="d-flex gap-2">
          <Link to="/add-contact" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>Nuevo contacto
          </Link>
          <button onClick={handleChangeAgenda} className="btn btn-secondary">
            <i className="fas fa-exchange-alt me-2"></i>Cambiar agenda
          </button>
        </div>
      </div>

      {loading && <p>Cargando contactos...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && contacts.length === 0 && (
        <div className="alert alert-info">
          No tienes contactos en esta agenda.
          <Link className="alert-link ms-1" to="/add-contact">Crea tu primer contacto</Link>
        </div>
      )}

      {contacts.map((c) => (
        <ContactCard key={c.id} contact={c} onDelete={handleDelete} />
      ))}

    </div>
  )
}
