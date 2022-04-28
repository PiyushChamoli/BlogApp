import React from "react";
import { withRouter } from "react-router-dom";
import { articlesURL } from "../utils/Const";

class CommentBox extends React.Component {
  state = {
    textarea: "",
    error: null,
  };

  handleChange = ({ target }) => {
    this.setState({ textarea: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let slug = this.props.slug;
    fetch(`${articlesURL}/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.token}`,
      },
      body: JSON.stringify({ comment: { body: this.state.textarea } }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot Create Comment");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ textarea: "" });
        this.props.history.push("/article/" + slug);
      })
      .catch((error) => this.setState(error));
  };

  render() {
    return (
      <form className="subcontainer comment-box">
        <textarea
          name="textarea"
          rows="4"
          value={this.state.textarea}
          onChange={this.handleChange}
          placeholder="Write your comment"
          className="c-ta"
        ></textarea>
        <input
          type="submit"
          value="Submit"
          className="c-btn"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

export default withRouter(CommentBox);
