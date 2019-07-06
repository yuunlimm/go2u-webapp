import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      firstName: "",
      userType: "",
      lastName: "",
      email: "",
      mobile: "",
      isGoer: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    firstName: Joi.string()
      .required()
      .label("First Name"),
    userType: Joi.string()
      .required()
      .label("User Type"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    email: Joi.string()
      .required()
      .label("Email Address"),
    mobile: Joi.string()
      .required()
      .label("Phone Number"),
    isGoer: Joi.boolean()
      .required()
      .label("Goer")
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.localStorage = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("userType", "User Type")}
          {this.renderInput("email", "Email")}
          {this.renderInput("mobile", "Phone Number")}
          {this.renderInput("isGoer", "isGoer")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
