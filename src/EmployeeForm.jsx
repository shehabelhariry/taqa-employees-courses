import { useEffect, useState } from "react";

const EmployeeForm = ({ onClick, error, setError }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setError("");
  }, [text]);
  return (
    <div className="email-form">
      <div className="email-field">
        <label>Email: </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your company email"
          type="email"
        />
      </div>
      <button onClick={() => onClick(text)} className="submit-button">
        Submit
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EmployeeForm;
