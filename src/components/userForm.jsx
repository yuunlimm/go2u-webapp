import React from "react";

const UserForm = ({ match, history }) => {
  return (
    <div>
      <h1>User From {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/users")}
      >
        Save
      </button>
    </div>
  );
};

export default UserForm;
