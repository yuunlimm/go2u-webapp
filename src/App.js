import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UserForm from "./components/userForm";
import Reviews from "./components/reviews";
import NavBar from "./components/navbar";
import User from "./components/user";
import NotFound from "./components/notFound";
import About from "./components/about";
import LoginForm from "./components/loginForm";
import "./App.css";
import RegisterForm from "./components/registerForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
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
