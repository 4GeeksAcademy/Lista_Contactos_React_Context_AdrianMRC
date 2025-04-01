import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

const baseUrl = 'https://playground.4geeks.com/contact/agendas/';

export const AgendaSelector = () => {
  const [agendaSlug, setAgendaSlug] = useState("");
  const { dispatch, store } = useGlobalReducer();

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
          toast.success("¡Agenda creada exitosamente! 🎉");
        } else if (res.status === 400) {
          toast.error("⚠️ La agenda ya existe");
        }
        return res.json();
      })
      .catch(error => {
        toast.error("Error de conexión 🔌");
        console.error("Error:", error);
      });
  };

  const handleLoadAgenda = () => {
    fetch(`${baseUrl}${agendaSlug}`)
      .then(res => {
        if (!res.ok) throw new Error("Agenda no encontrada");
        dispatch({ type: "SET_AGENDA", payload: agendaSlug });
        toast.success(`Agenda ${agendaSlug} cargada ✅`);
      })
      .catch(error => {
        toast.error(`${error.message} 🚨. ¡Crea la agenda primero!`);
        console.error("Error loading agenda:", error);
      });
  };

  const handleDeleteAgenda = () => {
    if (!agendaSlug) {
      toast.warning("Escribe el nombre de la agenda a eliminar");
      return;
    }

    if (!window.confirm(`¿Estás seguro de querer eliminar la agenda '${agendaSlug}'?`)) return;

    fetch(`${baseUrl}${agendaSlug}`, {
      method: "DELETE",
      headers: { "accept": "application/json" }
    })
      .then(async (res) => {
        const responseText = await res.text();
        const data = responseText ? JSON.parse(responseText) : {};

        if (res.status === 204) {
          toast.success(`Agenda "${agendaSlug}" eliminada con éxito 🗑️`);
          setAgendaSlug("");

          if (store.currentAgenda === agendaSlug) {
            dispatch({ type: "SET_AGENDA", payload: null });
          }
          logAgendas();

        } else if (res.status === 400) {
          toast.error(`⚠️ La agenda "${agendaSlug}" no existe`);
        }
        if (data.message && res.status !== 200) {
          toast.error(data.message);
        }
      })
      .catch(error => {
        toast.error("Error de conexión 🔌");
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Gestión de Agendas</h2>
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
            Crear Nueva
          </button>
          <button onClick={handleLoadAgenda} className="btn btn-success">
            <i className="fas fa-download me-2"></i>
            Cargar Existente
          </button>
          <button onClick={handleDeleteAgenda} className="btn btn-danger">
            <i className="fas fa-trash me-2"></i>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};