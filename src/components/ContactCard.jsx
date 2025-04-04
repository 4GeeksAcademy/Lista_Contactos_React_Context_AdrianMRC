import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { toast } from "react-toastify";

export const ContactCard = ({ contact }) => {

  const { store, dispatch } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {

    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${store.currentAgenda}/contacts/${contact.id}`,
        {
          method: "DELETE",
          headers: { "Accept": "application/json" }
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      dispatch({ type: "DELETE_CONTACT", payload: contact.id });
      toast.success(`Contact ${contact.name} removed successfully`);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Error deleting contact");
    } finally { setShowModal(false) }
  };

  //Avatar dinámico
  const nameHash = contact.name.split('').reduce((acc, char) =>
    char.charCodeAt(0) + acc, 0
  );
  const avatarColor = `hsl(${nameHash % 360}, 70%, 40%)`;
  const generateInitials = (name) => {
    const parts = name.split(' ').filter(part => part.trim().length > 0);
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    if (parts.length === 1 && parts[0].length >= 2) return parts[0].substring(0, 2);
    return '??';
  };
  const initials = generateInitials(contact.name).toUpperCase();


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
            <p className="card-text">
              <i className="fas fa-map-marker-alt me-1"></i>
              {contact.address}
            </p>
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
          showFooter={false}
        >
          <div className="text-center">
            <h4>Delete {contact.name}</h4>
            <p>Are you sure you want to delete this contact?</p>
            <p><strong>This action cannot be undone!</strong></p>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};