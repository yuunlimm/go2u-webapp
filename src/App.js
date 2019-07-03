import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserForm from "./components/userForm";
import Reviews from "./components/reviews";
import NavBar from "./components/navbar";
import User from "./components/user";
import NotFound from "./components/notFound";
import About from "./components/about";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import OrderForm from "./components/orderForm";
import Order from "./order";
import NeworderForm from "./components/neworderForm";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = { user: "" };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/neworder" component={NeworderForm} />
            <Route path="/orders" component={Order} />
            <Route path="/orders/:id" component={OrderForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/about" component={About} />
            <Route path="/users/:id" component={UserForm} />
            <Route path="/users" component={User} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/about" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
