import { useState } from "react";
import { Link } from "react-router-dom";

export const Demo = () => {
  // Contador interactivo
  const [count, setCount] = useState(0);
  
  // Generador de número aleatorio
  const [randomNumber, setRandomNumber] = useState(null);
  
  // Cambiador de color
  const [isColorChanged, setIsColorChanged] = useState(false);

  return (
    <div className="container mt-5">
      <h1>Página Interactiva</h1>
      
      {/* Sección de contador */}
      <div className="card mb-3 p-3">
        <h3>Contador Interactivo</h3>
        <p>Valor actual: {count}</p>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-success"
            onClick={() => setCount(prev => prev + 1)}
          >
            +
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => setCount(prev => prev - 1)}
          >
            -
          </button>
        </div>
      </div>

      {/* Generador de números aleatorios */}
      <div className="card mb-3 p-3">
        <h3>Número Aleatorio</h3>
        <p>{randomNumber || "Haz clic para generar"}</p>
        <button
          className="btn btn-warning"
          onClick={() => setRandomNumber(Math.floor(Math.random() * 1000000) + 1)}
        >
          Generar Número
        </button>
      </div>

      {/* Cambiador de color */}
      <div className="card mb-3 p-3">
        <h3>Cambiador de Color</h3>
        <div 
          className={`p-4 ${isColorChanged ? 'bg-primary' : 'bg-danger'}`}
          style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
          onClick={() => setIsColorChanged(!isColorChanged)}
        >
          <p className="text-white mb-0">Haz clic para cambiar color</p>
        </div>
      </div>

      {/* Botón para volver a Home */}
      <Link to="/home" className="mt-3 d-block">
        <button className="btn btn-primary">Volver al Inicio</button>
      </Link>
    </div>
  );
};

export default Demo;