import React, { Component } from "react";
import { getUsers, deleteUser } from "../services/userService";
import { paginate } from "../utils/pagination";
import Pagination from "./common/page";
import UserTable from "./usersTable";
import ListGroup from "./common/listGroup";
import { getUserTypes } from "../services/userTypeService";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class User extends Component {
  state = {
    users: [],
    types: [],
    pageSize: 5,
    currentPage: 1,
    selectedType: null,
    searchQuery: "",
    sortColumn: { path: "Last Name", order: "asc" }
  };

  async populateUsers() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  async componentDidMount() {
    await this.populateUsers();
    const types = [{ _id: "", type: "All Users" }, ...getUserTypes()];
    this.setState({ types });
  }

  handleTypeChange = type => {
    this.setState({ selectedType: type, currentPage: 1 });
  };

  handleDelete = async user => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter(u => u._id !== user._id);
    this.setState({ users });

    try {
      await deleteUser(user._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted.");

      this.setState({ users: originalUsers });
    }
  };

  handleUsertypeSelect = userType => {
    this.setState({ selectedType: userType, currentPage: 1, searchQuery: "" });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1, selectedType: null });
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
        u.name.lastName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedType && selectedType._id)
      filtered = allUsers.filter(
        user => user.userType._id === selectedType._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: users, searchQuery };
  };

  render() {
    const { length: count } = this.state.users;
    const { pageSize, currentPage, sortColumn } = this.state;
    const { user: currentUser } = this.props;

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
          {currentUser && (
            <Link
              to="/register"
              className="btn btn-primary"
              style={{ margin: 20 }}
            >
              New User
            </Link>
          )}
          <p>Showing {totalCount} users in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <UserTable
            onSort={this.handleSort}
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
