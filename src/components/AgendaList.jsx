export function AgendaList({ agendas, onSelect }) {
    if (!agendas || agendas.length === 0)
      return <div className="alert alert-warning">No hay agendas creadas</div>;
  
    return (
      <ul className="list-group mt-3">
        {agendas.map((ag) => (
          <li key={ag.slug} className="list-group-item">
            <button
              onClick={() => onSelect(ag.slug)}
              className="btn btn-link btn-sm p-0"
            >
              {ag.slug}
            </button>
          </li>
        ))}
      </ul>
    );
  }
  