import React from "react";

const Input = ({ name, lable, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{lable}</label>
      <input
        value={value}
        id={name}
        name={name}
        type="text"
        className="form-control"
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
