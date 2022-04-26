import React from "react";
import { articlesURL } from "../utils/Const";
import Posts from "./Posts";
import ProfileBanner from "./ProfileBanner";

class Profile extends React.Component {
  state = {
    activeTab: "author",
    articles: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(articlesURL + `/?${this.state.activeTab}=${this.props.user.username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cannot Fetch Data");
        }
        return res.json();
      })
      .then((data) => this.setState({ articles: data.articles }))
      .catch((err) => this.setState({ error: "Not Able to fetch data" }));
  };

  handleActive = (tab) => {
    this.setState({ activeTab: tab }, () => this.fetchData());
  };

  render() {
    const { activeTab } = this.state;
    const { user } = this.props;
    return (
      <div className="container profile">
        <ProfileBanner user={user} />
        <div className="article-heading">
          <ul className="flex">
            <li>
              <button
                className={activeTab === "author" ? "active p-btn" : "p-btn"}
                onClick={() => this.handleActive("author")}
              >
                My Articles
              </button>
            </li>
            <li>
              <button
                className={activeTab === "favorited" ? "active p-btn" : "p-btn"}
                onClick={() => this.handleActive("favorited")}
              >
                Favourite Articles
              </button>
            </li>
          </ul>
          <hr />
          <Posts articles={this.state.articles} />
        </div>
      </div>
    );
  }
}

export default Profile;
