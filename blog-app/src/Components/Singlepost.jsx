import React from "react";
import { articlesURL } from "../utils/Const";
import Loader from "./Loader";
import { NavLink, withRouter } from "react-router-dom";
import CommentBox from "./CommentBox";
import Comments from "./Comments";

class Singlepost extends React.Component {
  state = {
    article: null,
    error: "",
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(articlesURL + "/" + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => this.setState({ article: data.article }))
      .catch((err) => this.setState({ error: "Not able to fetch article" }));
  }

  handleEdit = () => {
    let slug = this.props.match.params.slug;
    this.props.history.push(`/article/edit/${slug}`);
  };

  handleDelete = () => {
    fetch(articlesURL + "/" + this.props.match.params.slug, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        this.props.history.push(`/`);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { article, error } = this.state;
    const isLoggedIn = this.props.isLoggedIn;
    const loggedInUser = this.props.user.username;
    if (error) {
      return <h2>{error}</h2>;
    }
    if (!article) {
      return <Loader />;
    }
    return (
      <main className="singlepost">
        <div className="article-hero">
          <div className="container">
            <h1>{article.title}</h1>
            <div className="flex justify-start align-center">
              <img src={article.author.image || `logo512.png`} alt="icon"></img>
              <div className="article-user">
                <h3>{article.author.username}</h3>
                <p className="date">{article.createdAt.split("T")[0]}</p>
              </div>
              {isLoggedIn && loggedInUser === article.author.username ? (
                <div className="ed-btn flex">
                  <button className="e-btn" onClick={this.handleEdit}>
                    Edit
                  </button>
                  <button className="d-btn" onClick={this.handleDelete}>
                    Delete
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <p className="single-article">{article.body}</p>
          <ul className="flex justify-start">
            {article.tagList.map((tag, i) => (
              <li key={i} className="taglist">
                {tag}
              </li>
            ))}
          </ul>
          <hr className="hr" />
          {this.props.user === null ? (
            <h6 className="flex">
              <NavLink to="/signup">Sign up </NavLink> or{" "}
              <NavLink to="/login">Sign in</NavLink> to add comments on this
              article.
            </h6>
          ) : (
            ""
          )}
          {this.props.isLoggedIn && (
            <CommentBox
              slug={this.props.match.params.slug}
              token={this.props.user.token}
            />
          )}
          <Comments
            token={this.props.user.token}
            slug={this.props.match.params.slug}
            loggedInUser={this.props.user.username}
            isLoggedIn={this.props.isLoggedIn}
          />
        </div>
      </main>
    );
  }
}

export default withRouter(Singlepost);
