import React from "react";
import { articlesURL } from "../utils/Const";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";

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

  render() {
    const { article, error } = this.state;
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
              <img src={article.author.image} alt="icon"></img>
              <div className="article-user">
                <h3>{article.author.username}</h3>
                <p className="date">{article.createdAt.split("T")[0]}</p>
              </div>
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
          <h6 className="flex">
            <NavLink to="/signup">Sign up </NavLink> or{" "}
            <NavLink to="/login">Sign in</NavLink> to add comments on this
            article.
          </h6>
        </div>
      </main>
    );
  }
}

export default Singlepost;
