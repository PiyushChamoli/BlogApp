import React from "react";
import { withRouter } from "react-router-dom";
import { articlesURL } from "../utils/Const";
import Loader from "./Loader";

class UpdateArticle extends React.Component {
  state = {
    article: "",
    title: "",
    description: "",
    body: "",
    tagList: "",
    error: "",
  };

  handleInput = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    fetch(articlesURL + `/${this.props.match.params.slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ article }) => {
        let { title, description, tagList, body } = article;
        this.setState({
          article,
          title,
          body,
          description,
          tagList: tagList.join(","),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit = (event) => {
    let { title, description, body, tagList } = this.state;
    event.preventDefault();
    if (title && description && body && tagList) {
      fetch(articlesURL + "/" + this.props.match.params.slug, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + this.props.user.token,
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
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then((data) => {
          this.props.history.push(`/article/${this.props.match.params.slug}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ error: "Enter all fields" });
    }
  };

  render() {
    if (!this.state.article) {
      return <Loader />;
    }
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

export default withRouter(UpdateArticle);
