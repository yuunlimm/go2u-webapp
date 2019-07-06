import React, { Component } from "react";
import Table from "./common/table";
import auth from "../services/authService";
import { Link } from "react-router-dom";

class UserTable extends Component {
  column = [
    {
      path: "firstName",
      label: "First Name",
      content: user => (
        <Link to={`/users/${user._id}`}>{user.name.firstName}</Link>
      )
    },
    { path: "name.lastName", label: "Last Name" },
    { path: "email", label: "Email" },
    { path: "phone.number", label: "Phone Number" },
    { path: "isGoer", label: "Goer" }
  ];

  deleteColumn = {
    key: "delete",
    content: user => (
      <button
        onClick={() => this.props.onDelete(user)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.column.push(this.deleteColumn);
  }

  render() {
    const { onSort, sortColumn, users } = this.props;
    return (
      <Table
        columns={this.column}
        sortColumn={sortColumn}
        data={users}
        onSort={onSort}
      />
    );
  }
}

export default UserTable;
