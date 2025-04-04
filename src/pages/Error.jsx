import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/home");
    }, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h1 className="text-danger">¡Ups! Page not found</h1>
      <div className="error-icon display-1 my-4">🚧</div>
      <p className="lead">
        The page you are looking for does not exist or an error has occurred
      </p>
      <div className="countdown-text my-3">
        Redirecting Home in {countdown} seconds...
      </div>
      <div className="mt-4">
        <Link to="/home" className="btn btn-primary">
          Go back Home now
        </Link>
      </div>
    </div>
  );
};

export default Error;