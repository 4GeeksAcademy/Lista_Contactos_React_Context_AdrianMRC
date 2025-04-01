import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Configurar el temporizador de redirección
    const redirectTimer = setTimeout(() => {
      navigate("/home");
    }, 10000);

    // Configurar el contador visual
    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    // Limpiar los timers
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-danger">¡Ups! Página no encontrada</h1>
      <div className="error-icon display-1 my-4">🚧</div>
      <p className="lead">
        La página que buscas no existe o ha ocurrido un error
      </p>
      <div className="countdown-text my-3">
        Redirigiendo a Home en {countdown} segundos...
      </div>
      <div className="mt-4">
        <Link to="/home" className="btn btn-primary">
          Volver al Inicio ahora
        </Link>
      </div>
    </div>
  );
};

export default Error;