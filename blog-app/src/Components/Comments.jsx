import React from "react";
import { articlesURL } from "../utils/Const";

class Comments extends React.Component {
  state = {
    comments: [],
    errors: null,
  };

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    fetch(`${articlesURL}/${this.props.slug}/comments`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      })
      .then(({ comments }) =>
        this.setState({ comments }, () => console.log(comments))
      )
      .catch((errors) => this.setState({ errors }));
  };

  handleDelete = (event) => {
    const id = event.target.dataset.id;
    const slug = this.props.slug;
    fetch(articlesURL + "/" + slug + "/comments/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${this.props.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        this.setState({ comments: [] }, () => this.fetchComments());
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (!this.state.comments) {
      return "";
    }
    return (
      <ul className="subcontainer comments">
        {this.state.comments.map((comment) => (
          <li key={comment.id}>
            <div className="outer">
              <h3>{comment.body}</h3>
            </div>
            <div className="inner flex justify-between align-center">
              <p>{comment.author.username}</p>
              {this.props.loggedInUser === comment.author.username &&
              this.props.isLoggedIn ? (
                <button
                  className="c-d-btn"
                  data-id={comment.id}
                  onClick={this.handleDelete}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Comments;
