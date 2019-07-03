import React from "react";
import Form from "./common/form";
import { getUser, saveUser } from "../services/userService";
import Joi from "joi-browser";
import { getUserTypes } from "../services/userTypeService";

class UserForm extends Form {
  state = {
    data: {
      username: "",
      firstName: "",
      lastName: "",
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

  async populateUser() {
    try {
      const userId = this.props.match.params.id;
      if (userId === "new") return;
      const { data: user } = await getUser(userId);
      console.log(user);
      console.log(this.mapToViewModel(user));
      console.log("d");
      this.setState({ data: this.mapToViewModel(user) });
      console.log(this.state.firstName);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    const userType = getUserTypes();
    this.setState({ userType });
    await this.populateUser();
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      username: "adfadf",
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      email: user.email,
      mobile: user.phone.number,
      isGoer: user.isGoer
    };
  }

  doSubmit = async () => {
    await saveUser(this.state.data);
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
