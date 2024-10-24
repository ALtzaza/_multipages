import { useState } from "react";

import "./Variable.css";

function Variable({type, name, value, setValue }) {

//   const [value, setValue] = useState(value || 0);


  return (
    <div className="counter-container">
      <h3 className="title">{name || "VARIABLE"}</h3>
      <button className="btn btn-danger" onClick={() => setValue(value - 1)}>
        &minus;
      </button>
      <span className="value">{type && type === 'int' ? value : value.toFixed(2)}</span>
      <button
        className="btn btn-success"
        onClick={() => setValue(value + 1) }>+</button>
    </div>
  );
}

export default Variable;
