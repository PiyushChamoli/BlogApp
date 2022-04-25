import React from "react";
import { Link, withRouter } from "react-router-dom";
import { loginURL } from "../utils/Const";
import Validation from "../utils/validation/validation";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
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
    const { email, password } = this.state;
    fetch(loginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } }),
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
        this.props.history.push("/");
      })
      .catch((errors) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: "Email or Password is incorrect",
            },
          };
        })
      );
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="container">
        <div className="form-container">
          <h2>Log In</h2>
          <Link to="/signup">Need an account?</Link>
          <form>
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
              value="Login"
              onClick={(event) => this.handleSubmit(event)}
              className="submit-btn"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
