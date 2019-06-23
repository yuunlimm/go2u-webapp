import React, { Component } from "react";
import { getUsers } from "../userService";

class User extends Component {
  state = {
    users: getUsers()
  };

  render() {
    return (
      <React.Fragment>
        <span> Users</span>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">email</th>
              <th scope="col">phone number</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user._id}>
                <th>{user.firstName}</th>
                <th>{user.lastName}</th>
                <th>{user.email}</th>
                <th>{user.mobile}</th>
                <td>
                  <button
                    onClick={() => this.handleDelete(user)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default User;
