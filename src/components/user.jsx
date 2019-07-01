import React, { Component } from "react";
import { getUsers } from "../services/userService";
import { paginate } from "../utils/pagination";
import Pagination from "./common/page";
import UserTable from "./usersTable";
import ListGroup from "./common/listGroup";
import { getUserTypes } from "../services/userTypeService";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class User extends Component {
  state = {
    users: [],
    types: [],
    pageSize: 5,
    currentPage: 1,
    selectedType: "User",
    searchQuery: null,
    sortColumn: { path: "Last Name", order: "asc" }
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    const types = [{ _id: "", type: "All Users" }, ...getUserTypes()];
    this.setState({ users, types });
  }
  handleTypeChange = type => {
    this.setState({ selectedType: type, currentPage: 1 });
  };

  handleDelete = user => {
    const users = this.state.users.filter(u => u._id !== user._id);
    this.setState({ users });
  };

  handleUsertypeSelect = userType => {
    this.setState({ selectedType: userType, currentPage: 1, searchQuery: "" });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1, selectedType: "" });
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
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(u =>
        u.lastName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedType && selectedType._id)
      filtered = allUsers.filter(
        user => user.userType._id === selectedType._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: users };
  };
  render() {
    const { length: count } = this.state.users;
    console.log(count);
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no users in the database.</p>;

    const { totalCount, data, searchQuery } = this.getPagedData();

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
          <Link
            to="/register"
            className="btn btn-primary"
            style={{ margin: 20 }}
          >
            New User
          </Link>
          <p>Showing {totalCount} users in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
