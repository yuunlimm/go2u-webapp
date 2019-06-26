import React, { Component } from "react";
import { getUsers } from "../userService";
import { paginate } from "../utils/pagination";
import Pagination from "./common/page";
import UserTable from "./usersTable";
import ListGroup from "./common/listGroup";
import { getUserTypes } from "../userTypeService";
import _ from "lodash";

class User extends Component {
  state = {
    users: [],
    types: [],
    pageSize: 5,
    currentPage: 1,
    selectedType: "User",
    sortColumn: { path: "Last Name", order: "asc" }
  };

  componentDidMount() {
    const types = [{ _id: "", type: "All Users" }, ...getUserTypes()];
    this.setState({ users: getUsers(), types });
  }
  handleTypeChange = type => {
    this.setState({ selectedType: type, currentPage: 1 });
  };

  handleDelete = user => {
    const users = this.state.users.filter(u => u._id !== user._id);
    this.setState({ users });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      users: allUsers,
      pageSize,
      currentPage,
      selectedType,
      sortColumn
    } = this.state;
    const filtered =
      selectedType && selectedType._id
        ? allUsers.filter(user => user.userType._id === selectedType._id)
        : allUsers;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: users };
  };
  render() {
    const { length: count } = this.state.users;
    console.log(count);
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no users in the database.</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            userType={this.state.types}
            selectedType={this.state.selectedType}
            onItemSelected={this.handleTypeChange}
          />
        </div>
        <div className="col">
          <UserTable
            onSort={this.handSort}
            sortColumn={sortColumn}
            users={data}
            onDelete={this.handleDelete}
          />
          <Pagination
            userCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default User;
