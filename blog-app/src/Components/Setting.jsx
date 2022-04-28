import React from "react";
import { withRouter } from "react-router-dom";
import { userVerifyUrl } from "../utils/Const";

class Settings extends React.Component {
  state = {
    bio: "",
    image: "",
    email: this.props.user.email,
    username: this.props.user.username,
    password: "",
  };

  handleInput = ({ target }) => {
    let { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { bio, image, password, username, email } = this.state;
    fetch(userVerifyUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        user: { bio, image, password, username, email },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot create article");
        }
        return res.json();
      })
      .then((user) => this.props.history.push("/profile"))
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <div className="container setting">
        <form onSubmit={this.handleSubmit}>
          <input
            type="url"
            name="image"
            value={this.state.image}
            onChange={this.handleInput}
            placeholder="URL of profile picture"
          />
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            placeholder="Username"
            readOnly
          />
          <textarea
            name="bio"
            rows="7"
            value={this.state.bio}
            onChange={this.handleInput}
            placeholder="Short bio about you"
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            // onChange={this.handleInput}
            placeholder="Enter Email"
            readOnly
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            placeholder="New Password"
          />
          <button className="submit" type="submit" onClick={this.handleSubmit}>
            Update Settings
          </button>
        </form>
        <hr />
        {/* <button className="logout" type="logout">
          Or click here to logout.
        </button> */}
      </div>
    );
  }
}

export default withRouter(Settings);
