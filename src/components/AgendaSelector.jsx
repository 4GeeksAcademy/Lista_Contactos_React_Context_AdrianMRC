import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const baseUrl = 'https://playground.4geeks.com/contact/agendas/';

export const AgendaSelector = () => {
  const [agendaSlug, setAgendaSlug] = useState("");
  const { dispatch, store } = useGlobalReducer();

  // Función para mostrar agendas en consola
  const logAgendas = async () => {
    try {
      const response = await fetch(`${baseUrl}`);
      if (!response.ok) {
        console.error("Error status:", response.status);
        return;
      }
      const agendas = await response.json();
      console.log(agendas);
    } catch (error) {
      console.error("Error fetching agendas:", error);
    }
  };

  // Ejecutar al cargar el componente
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
        console.log("Agenda creada exitosamente");
        dispatch({ type: "SET_AGENDA", payload: agendaSlug });
      }
    })
    .catch(error => console.error("Error:", error));
  };

  const handleLoadAgenda = () => {
    fetch(`${baseUrl}${agendaSlug}`)
    .then(res => {
      if (!res.ok) throw new Error("Agenda not found");
      dispatch({ type: "SET_AGENDA", payload: agendaSlug });
    })
    .catch(error => {
      console.error("Error loading agenda:", error);
      alert(`Error: ${error.message}. Create it first!`);
    });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2>Select or Create Agenda</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter agenda name"
          value={agendaSlug}
          onChange={(e) => setAgendaSlug(e.target.value)}
        />
        <div className="d-flex gap-2">
          <button onClick={handleCreateAgenda} className="btn btn-primary">
            Create New Agenda
          </button>
          <button onClick={handleLoadAgenda} className="btn btn-success">
            Load Existing Agenda
          </button>
        </div>
      </div>
    </div>
  );
};