import React from "react";
import Validation from "../utils/validation/validation";
import { Link, withRouter } from "react-router-dom";
import { signupURL } from "../utils/Const";

class Signup extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    errors: {
      email: "",
      password: "",
      username: "",
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    Validation(errors, name, value);
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    fetch(signupURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { username, password, email } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: "", email: "", password: "" });
        this.props.history.push("/");
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { username, email, password, errors } = this.state;
    return (
      <div className="container">
        <div className="form-container">
          <h2>Sign Up</h2>
          <Link to="/login">Have an account?</Link>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={(event) => this.handleChange(event)}
              className="form-control"
            />
            <span>{errors.username}</span>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(event) => this.handleChange(event)}
              className="form-control"
            />
            <span>{errors.email}</span>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(event) => this.handleChange(event)}
              className="form-control"
            />
            <span>{errors.password}</span>
            <input
              type="submit"
              value="Signup"
              onClick={(event) => this.handleSubmit(event)}
              className="submit-btn"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
