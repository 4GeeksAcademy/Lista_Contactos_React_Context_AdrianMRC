import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAgendas } from "../hooks/useAgendas";
import { AgendaForm } from "./AgendaForm";
import { AgendaList } from "./AgendaList";
import { Modal } from "./Modal";

export const AgendaSelector = () => {
  const navigate = useNavigate();
  const {
    agendas,
    loadAgendas,
    createAgenda,
    deleteAgenda,
    loadAgendaContacts,
  } = useAgendas();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [agendaToDelete, setAgendaToDelete] = useState(null);

  useEffect(() => {
    loadAgendas();
  }, []);

  const handleCreate = async (slug) => {
    try {
      const newAgenda = await createAgenda(slug);
      await loadAgendas();
      await loadAgendaContacts(newAgenda.slug);
      navigate(`/contacts?agenda=${newAgenda.slug}`);
      toast.success(`Agenda "${slug}" creada 🎉`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLoad = async (slug) => {
    try {
      await loadAgendaContacts(slug);
      navigate(`/contacts?agenda=${slug}`);
      toast.success(`Agenda "${slug}" cargada ✅`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (slug) => {
    setAgendaToDelete(slug);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAgenda(agendaToDelete);
      toast.success(`Agenda "${agendaToDelete}" eliminada 🗑️`);
      setAgendaToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Gestión de agendas</h2>

        <AgendaForm
          onCreate={handleCreate}
          onLoad={handleLoad}
          onDelete={handleDelete}
        />

        <h5>Agendas disponibles:</h5>
        <AgendaList agendas={agendas} onSelect={handleLoad} />

        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title="Eliminar Agenda"
          confirmText="Confirmar"
          cancelText="Cancelar"
        >
          <p>¿Estás seguro que quieres eliminar la agenda <strong>{agendaToDelete}</strong>?</p>
          <p className="text-danger">¡Esta acción no puede deshacerse!</p>
        </Modal>
      </div>
    </div>
  );
};
