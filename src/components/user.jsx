import React, { Component } from "react";
import { getUsers } from "../userService";
import { paginate } from "../utils/pagination";
import Pagination from "./common/page";

class User extends Component {
  state = {
    users: getUsers(),
    pageSize: 5,
    currentPage: 1
  };

  handleDelete = user => {
    const users = this.state.users.filter(u => u._id !== user._id);
    this.setState({ users });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.users;
    const { users: allUsers, pageSize, currentPage } = this.state;

    const users = paginate(allUsers, currentPage, pageSize);

    if (count === 0) return <p>There are no users in the database.</p>;
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
            {users.map(user => (
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
        <Pagination
          userCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default User;
