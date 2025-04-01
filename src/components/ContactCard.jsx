import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { Modal } from "../components/Modal";

export const ContactCard = ({ contact }) => {
 
  const { store, dispatch } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${store.currentAgenda}/contacts/${contact.id}`, {
      method: "DELETE",
      headers: { "Accept": "application/json" }
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        dispatch({ type: "DELETE_CONTACT", payload: contact.id });
      })
      .catch(error => console.error("Delete error:", error))
      .finally(() => setShowModal(false));
  };

  const nameHash = contact.name.split('').reduce((acc, char) =>
    char.charCodeAt(0) + acc, 0
  );
  const avatarColor = `hsl(${nameHash % 360}, 70%, 40%)`;

  
  const initials = contact.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);


  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center gap-3">
          <div
            className="avatar d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: avatarColor,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              color: 'white',
              fontWeight: 'bold',
              flexShrink: 0
            }}
          >
            {initials}
          </div>

          <div className="flex-grow-1">
            <h5 className="card-title mb-1">{contact.name}</h5>
            <p className="card-text mb-1">
              <i className="fas fa-phone me-1"></i>
              {contact.phone}
            </p>
            <p className="card-text mb-1">
              <i className="fas fa-envelope me-1"></i>
              {contact.email}
            </p>
            {contact.address && (
              <p className="card-text">
                <i className="fas fa-map-marker-alt me-1"></i>
                {contact.address}
              </p>
            )}
          </div>
        </div>

        {/* Botones de acciones */}
        <div className="d-flex gap-2 mt-3">
          <Link
            to={`/edit-contact/${contact.id}`}
            className="btn btn-sm btn-outline-warning"
          >
            <i className="fas fa-edit"></i>
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm btn-outline-danger"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>

        {/* Modal de confirmación */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="text-center">
            <h4 className="mb-3 fw-bold">Confirmar eliminación</h4>
            <p className="text-muted mb-4">
              ¿Estás seguro de querer eliminar a <strong>{contact.name}</strong>?
              Esta acción no se puede deshacer.
            </p>

            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-lg btn-outline-secondary"
                onClick={() => setShowModal(false)}
                style={{ minWidth: '120px' }}
              >
                <i className="fas fa-times me-2"></i>Cancelar
              </button>
              <button
                className="btn btn-lg btn-danger"
                onClick={handleDelete}
                style={{ minWidth: '120px' }}
              >
                <i className="fas fa-trash me-2"></i>Eliminar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};