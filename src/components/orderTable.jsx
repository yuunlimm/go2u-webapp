import React, { Component } from "react";
import Table from "./common/table";

class OrderTable extends Component {
  column = [
    {
      path: "_id",
      label: "User ID"
    },
    { path: "firstName", label: "First Name" },
    { path: "lastName", label: "Last Name" },
    {
      key: "delete",
      content: order => (
        <button
          onClick={() => this.props.onDelete(order)}
          className="btn btn-danger btn-sm"
        >
          {" "}
          Delete
        </button>
      )
    }
  ];

  render() {
    const { onSort, sortColumn, orders } = this.props;
    return (
      <Table
        columns={this.column}
        sortColumn={sortColumn}
        data={orders}
        onSort={onSort}
      />
    );
  }
}

export default OrderTable;
