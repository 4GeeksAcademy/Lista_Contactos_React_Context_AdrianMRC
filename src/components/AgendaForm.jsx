import { useState } from "react";

export function AgendaForm({ onCreate, onLoad, onDelete, disabled }) {
  const [agendaSlug, setAgendaSlug] = useState("");

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Agenda name"
        value={agendaSlug}
        onChange={e => setAgendaSlug(e.target.value)}
      />

      <div className="d-flex gap-2 flex-wrap">
        <button className="btn btn-primary" disabled={!agendaSlug || disabled} onClick={() => onCreate(agendaSlug)}>
          <i className="fas fa-plus me-2"></i>Crear nueva
        </button>

        <button className="btn btn-success" disabled={!agendaSlug || disabled} onClick={() => onLoad(agendaSlug)}>
          <i className="fas fa-download me-2"></i>Cargar existente
        </button>

        <button className="btn btn-danger" disabled={!agendaSlug || disabled} onClick={() => onDelete(agendaSlug)}>
          <i className="fas fa-trash me-2"></i>Eliminar agenda
        </button>
      </div>
    </div>
  );
}
