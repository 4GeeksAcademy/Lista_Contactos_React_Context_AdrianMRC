import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Modal } from "./Modal";

const baseUrl = 'https://playground.4geeks.com/contact/agendas/';

export const AgendaSelector = () => {
  const [agendaSlug, setAgendaSlug] = useState("");
  const { dispatch, store } = useGlobalReducer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const logAgendas = async () => {
    try {
      const response = await fetch(`${baseUrl}`);
      if (!response.ok) return;
      const agendas = await response.json();
      console.log(agendas);
    } catch (error) {
      console.error("Error fetching agendas:", error);
    }
  };

  useEffect(() => {
    logAgendas();
  }, []);

  const handleCreateAgenda = () => {
    fetch(`${baseUrl}${agendaSlug}`, {
      method: "POST",
      headers: { "accept": "application/json" },
      body: JSON.stringify({})
    })
      .then(res => {
        if (res.status === 201) {
          dispatch({ type: "SET_AGENDA", payload: agendaSlug });
          toast.success("Agenda created successfully! 🎉");
        } else if (res.status === 400) {
          toast.error("⚠️ The agenda already exists");
        }
        return res.json();
      })
      .catch(error => {
        toast.error("Conexion error 🔌");
        console.error("Error:", error);
      });
  };

  const handleLoadAgenda = () => {
    fetch(`${baseUrl}${agendaSlug}`)
      .then(res => {
        if (!res.ok) throw new Error("Agenda not found");
        dispatch({ type: "SET_AGENDA", payload: agendaSlug });
        toast.success(`Agenda ${agendaSlug} loaded ✅`);
      })
      .catch(error => {
        toast.error(`${error.message} 🚨.Create the agenda first!`);
        console.error("Error loading agenda:", error);
      });
  };

  const handleDeleteAgenda = () => {
    if (!agendaSlug) {
      toast.warning("Enter the name of the agenda to delete");
      return;
    }
  
    setShowDeleteModal(false);
  
    fetch(`${baseUrl}${agendaSlug}`, {
      method: "DELETE",
      headers: { "accept": "application/json" }
    })
    .then(async (res) => {
      const responseText = await res.text();
      const data = responseText ? JSON.parse(responseText) : {};
  
      switch (res.status) {
        case 204: 
          toast.success(`Agenda "${agendaSlug}" successfully deleted 🗑️`);
          setAgendaSlug("");
          if (store.currentAgenda === agendaSlug) {
            dispatch({ type: "SET_AGENDA", payload: null });
          }
          logAgendas();
          break;
  
        case 400: 
          toast.error(`⚠️ The agenda "${agendaSlug}" does not exist`);
          break;
  
        case 404: 
          toast.error("The requested resource does not exist");
          break;
  
        case 500: 
          toast.error("Server Error");
          console.error("Server Error:", data);
          break;
  
        default:
          if (data.message) {
            toast.error(data.message);
          } else {
            toast.error(`Unexpected error (Código ${res.status})`);
          }
      }
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        toast.warning("Canceled operation");
      } else {
        toast.error("Conexion error 🔌");
        console.error("Tecnical error:", error);
      }
    })
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Agenda Management</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nombre de la agenda"
          value={agendaSlug}
          onChange={(e) => setAgendaSlug(e.target.value)}
        />
        <div className="d-flex gap-2 flex-wrap">
          <button onClick={handleCreateAgenda} className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            Create new
          </button>
          <button onClick={handleLoadAgenda} className="btn btn-success">
            <i className="fas fa-download me-2"></i>
            Load existing
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="btn btn-danger"
          >
            Delete agenda
          </button>

          <Modal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteAgenda}
            title="Delete agenda"
          >
            <p className="text-muted">
              Are you sure you want to delete the agenda:
              <strong> {agendaSlug}</strong>?<br />
              This action cannot be undone!
            </p>
          </Modal>
        </div>
      </div>
    </div>
  );
};