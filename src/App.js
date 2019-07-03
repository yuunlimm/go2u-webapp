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
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import OrderForm from "./components/orderForm";
import Order from "./order";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
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
