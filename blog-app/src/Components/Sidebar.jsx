import React from "react";
import { Root_URL } from "../utils/Const";
import Loader from "./Loader";

class Sidebar extends React.Component {
  state = {
    tags: null,
    error: "",
  };

  componentDidMount() {
    fetch(Root_URL + "tags")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => this.setState({ tags: data.tags }))
      .catch((err) => this.setState({ error: "Not Able to Load Tags" }));
  }

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (!this.state.tags) {
      return <Loader />;
    }
    return (
      <div className="tags">
        <h3>Popular Tags</h3>
        {this.state.tags.map((tag, i) => (
          <button key={tag} onClick={() => this.props.addTab(tag)}>
            {tag}
          </button>
        ))}
      </div>
    );
  }
}

export default Sidebar;
