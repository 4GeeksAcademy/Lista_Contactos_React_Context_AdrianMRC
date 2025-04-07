import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../components/Modal";
import PropTypes from 'prop-types';

export const ContactCard = ({ contact, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(contact.id);
    setShowModal(false);
  };


  // Generación de avatar
  function Avatar({ name }) {
    const nameHash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const color = `hsl(${nameHash % 360}, 70%, 40%)`;

    const initials = (() => {
      const parts = name.split(' ').filter(p => p);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      if (parts[0]?.length >= 2) return parts[0].substring(0, 2).toUpperCase();
      return '??';
    })();

    return (
      <div className="avatar d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: color,
          width: 50,
          height: 50,
          borderRadius: '50%',
          color: 'white',
          fontWeight: 'bold',
          flexShrink: 0
        }}
      >
        {initials}
      </div>
    );
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center gap-3">
          <Avatar name={contact.name} />
          <div className="flex-grow-1">
            <h5 className="card-title mb-1"></h5>
            <div className="vstack gap-1">
              <p className="card-text mb-1">
                <i className="fas fa-user-circle me-1"></i>
                {contact.name || 'N/A'}
              </p>
              <p className="card-text mb-1">
                <i className="fas fa-phone me-1"></i>
                {contact.phone || 'N/A'}
              </p>
              <p className="card-text mb-1">
                <i className="fas fa-envelope me-1"></i>
                {contact.email || 'N/A'}
              </p>
              <p className="card-text">
                <i className="fas fa-map-marker-alt me-1"></i>
                {contact.address || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
          <Link
            to={`/edit-contact/${contact.id}`}
            className="btn btn-sm btn-outline-warning"
            aria-label={`Editar ${contact.name}`}
          >
            <i className="fas fa-edit"></i>
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-sm btn-outline-danger"
            aria-label={`Eliminar ${contact.name}`}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          title={`Eliminar ${contact.name}`}
          confirmText="Confirmar"
          cancelText="Cancelar"
        >
          <div className="text-center">
            <p>¿Estás seguro de eliminar este contacto?</p>
            <p><strong>¡Esta acción es permanente!</strong></p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};