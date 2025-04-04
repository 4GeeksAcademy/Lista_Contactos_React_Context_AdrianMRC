import { useState } from "react";
import { Link } from "react-router-dom";

export const Demo = () => {
  const [count, setCount] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [isColorChanged, setIsColorChanged] = useState(false);

  return (
    <div className="container mt-5">
      <h1>Interactive Page</h1>
      
      <div className="card mb-3 p-3">
        <h3>Interactive Counter</h3>
        <p>Actual value: {count}</p>
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

      <div className="card mb-3 p-3">
        <h3>Random Number</h3>
        <p>{randomNumber || "Click to generate"}</p>
        <button
          className="btn btn-warning"
          onClick={() => setRandomNumber(Math.floor(Math.random() * 1000000) + 1)}
        >
          Generate number
        </button>
      </div>

      <div className="card mb-3 p-3">
        <h3>Change color</h3>
        <div 
          className={`p-4 ${isColorChanged ? 'bg-primary' : 'bg-danger'}`}
          style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
          onClick={() => setIsColorChanged(!isColorChanged)}
        >
          <p className="text-white mb-0">Click to change color</p>
        </div>
      </div>

      <Link to="/home" className="mt-3 d-block">
        <button className="btn btn-primary">Home button</button>
      </Link>
    </div>
  );
};

export default Demo;