import React, { Component } from "react";
import Form from "./common/form";
import { getUser, saveUser } from "../userService";
import Joi from "joi-browser";
import { getUserTypes } from "../userTypeService";

class UserForm extends Form {
  state = {
    data: {
      username: "",
      firstName: "",
      lastName: "",
      userType: "",
      email: "",
      mobile: "",
      isGoer: ""
    },
    userType: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    username: Joi.string()
      .required()
      .label("Username"),
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    userType: Joi.string()
      .required()
      .label("User Type"),
    email: Joi.string()
      .required()
      .label("Email Address"),
    mobile: Joi.number()
      .required()
      .min(0)
      .max(999999999)
      .label("Phone Number"),
    isGoer: Joi.boolean()
      .required()
      .label("Goer")
  };

  componentDidMount() {
    const userType = getUserTypes();
    this.setState({ userType });

    const userId = this.props.match.params.id;
    if (userId === "new") return;

    const user = getUser(userId);
    if (!user) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(user) });
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType._id,
      email: user.email,
      mobile: user.mobile,
      isGoer: user.isGoer
    };
  }

  doSubmit = () => {
    saveUser(this.state.data);
    this.props.history.push("/users");
  };

  render() {
    return (
      <div>
        <h1>User Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderSelect("userType", "User Type", this.state.userType)}
          {this.renderInput("email", "Email")}
          {this.renderInput("mobile", "Phone Number")}
          {this.renderInput("isGoer", "isGoer")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default UserForm;
