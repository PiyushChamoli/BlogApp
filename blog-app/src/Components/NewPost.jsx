import React from "react";
import { withRouter } from "react-router-dom";
import { articlesURL } from "../utils/Const";

class NewPost extends React.Component {
  state = {
    title: "",
    description: "",
    tagList: "",
    body: "",
    errors: {
      title: "",
      description: "",
      taglist: "",
      body: "",
    },
  };

  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = { ...this.state.errors };
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body, tagList, errors } = this.state;
    fetch(articlesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(",").map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot Create Article");
        }
        return res.json();
      })
      .then((article) => {
        this.setState({ title: "", description: "", tagList: "", body: "" });
        this.props.history.push("/");
      })
      .catch((errros) => this.setState({ errors }));
  };

  render() {
    return (
      <form className=" container post" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInput}
          placeholder="Enter Title"
        />
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleInput}
          placeholder="What's this article about?"
        />
        <textarea
          name="body"
          rows="5"
          value={this.state.body}
          onChange={this.handleInput}
          placeholder="Write your article"
        />
        <input
          type="text"
          name="tagList"
          value={this.state.tagList}
          onChange={this.handleInput}
          placeholder="Enter Tags"
        />
        <button className="submit" type="submit" onClick={this.handleSubmit}>
          Publish Article
        </button>
      </form>
    );
  }
}

export default withRouter(NewPost);
