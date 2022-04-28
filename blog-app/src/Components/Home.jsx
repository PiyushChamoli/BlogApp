import React from "react";
import Banner from "./Banner";
import Posts from "./Posts";
import { articlesURL } from "../utils/Const";
import Pagination from "./Pagination";
import Sidebar from "./Sidebar";
import FeedNav from "./FeedNav";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  state = {
    articles: null,
    error: "",
    articlesCount: 0,
    articlesPerPage: 10,
    activePageIndex: 1,
    activeTab: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.activePageIndex !== this.state.activePageIndex ||
      prevState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    let limit = this.state.articlesPerPage;
    let offset = (this.state.activePageIndex - 1) * limit;
    let tag = this.state.activeTab;
    fetch(
      articlesURL +
        `?limit=${limit}&offset=${offset}` +
        (tag ? `&tag=${tag}` : "")
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) =>
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        })
      )
      .catch((err) => this.setState({ error: "Not Able To Fetch Data" }));
  };

  updateActivePageIndex = (page) => {
    this.setState({ activePageIndex: page });
  };

  removeTab = () => {
    this.setState({ activeTab: "" });
  };

  addTab = (tag) => {
    this.setState({ activeTab: tag });
  };

  handleFavorite = ({ target }) => {
    let isLoggedIn = this.props.isLoggedIn;
    let { id, slug } = target.dataset;
    let method = id === "false" ? "POST" : "DELETE";
    if (isLoggedIn) {
      fetch(articlesURL + "/" + slug + "/favorite", {
        method: method,
        headers: {
          Authorization: "Token " + this.props.user.token,
        },
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
          this.props.history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <main>
        <Banner />
        <div className="container flex justify-between wrap">
          <div className="flex-75">
            <FeedNav
              activeTab={this.state.activeTab}
              removeTab={this.removeTab}
            />
            <Posts
              articles={this.state.articles}
              error={this.state.error}
              isLoggedIn={this.props.isLoggedIn}
              handleFavorite={this.handleFavorite}
            />
            <Pagination
              articlesCount={this.state.articlesCount}
              articlesPerPage={this.state.articlesPerPage}
              activePageIndex={this.state.activePageIndex}
              updateActivePageIndex={this.updateActivePageIndex}
            />
          </div>
          <div className="flex-20">
            <Sidebar addTab={this.addTab} />
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(Home);

// 0135 7193435
// 4th floor 3437
