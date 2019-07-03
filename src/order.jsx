import React, { Component } from "react";
import OrderTable from "./components/orderTable";
import _ from "lodash";
import { toast } from "react-toastify";
import { getOrders, getOrder, deleteOrder } from "./services/orderService";
import { paginate } from "./utils/pagination";

class Order extends Component {
  state = {
    orders: [],
    orderTypes: [],
    pageSize: 5,
    currentPage: 1,
    selectedType: null,
    searchQuery: "",
    sortColumn: { path: "_id", order: "asc" }
  };

  async populateOrders() {
    const { data: orders } = await getOrders();
    console.log(orders[0]);
    this.setState({ orders });
  }

  async componentDidMount() {
    await this.populateOrders();
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async order => {
    const originalOrders = this.state.orders;
    const orders = originalOrders.filter(o => o._id !== order._id);
    this.setState({ orders });

    try {
      await deleteOrder(order._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This order has already been deleted.");
      this.setState({ originalOrders });
    }
  };

  getPageData = () => {
    const {
      orders: allOrders,
      pageSize,
      currentPage,
      selectedType,
      sortColumn,
      searchQuery
    } = this.state;
    let filtered = allOrders;
    if (searchQuery) filtered = allOrders.filter(o => o.userId === searchQuery);
    else if (selectedType && selectedType._id)
      filtered = allOrders.filter(
        order => order.orderTypes._id === selectedType._id
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const orders = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: orders, searchQuery };
  };

  render() {
    const { length: count } = this.state.orders;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p> There are no orders in the database.</p>;
    const { totalCount, data, searchQuery } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3" />
        <div className="col">
          <OrderTable
            onSort={this.handleSort}
            sortColumn={sortColumn}
            orders={data}
            onDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default Order;
