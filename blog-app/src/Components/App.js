import React from "react";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import NoMatch from "./NoMatch";
import Singlepost from "./Singlepost";
import { Switch, Route } from "react-router-dom";
import { localStorageKey, userVerifyUrl } from "../utils/Const";
import Loader from "./Loader";
import NewPost from "./NewPost";
import Profile from "./Profile";
import Setting from "./Setting";
import UpdateArticle from "./UpdateArticle";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: true,
  };

  updateUser = (user) => {
    this.setState({ isLoggedIn: true, isVerifying: false, user });
    localStorage.setItem(localStorageKey, user.token);
  };

  componentDidMount() {
    let key = localStorage[localStorageKey];
    if (key) {
      fetch(userVerifyUrl, {
        method: "GET",
        headers: { authorization: `Token ${key}` },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => {
          console.log(errors);
        });
    } else {
      this.setState({ isVerifying: false });
    }
  }

  render() {
    if (this.state.isVerifying) {
      return <Loader />;
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AunthenticationApp
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn}
          />
        ) : (
          <UnAuthenticationApp
            user={this.state.user}
            updateUser={this.updateUser}
            isLoggedIn={this.state.isLoggedIn}
          />
        )}
      </>
    );
  }
}

function AunthenticationApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home isLoggedIn={props.isLoggedIn} user={props.user} />
      </Route>
      <Route path="/new-post">
        <NewPost user={props.user} />
      </Route>
      <Route path="/profile">
        <Profile user={props.user} />
      </Route>
      <Route path="/setting">
        <Setting user={props.user} />
      </Route>
      <Route path="/article/edit/:slug" exact>
        <UpdateArticle user={props.user} />
      </Route>
      <Route path="/article/:slug" exact>
        <Singlepost user={props.user} isLoggedIn={props.isLoggedIn} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

function UnAuthenticationApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home isLoggedIn={props.isLoggedIn} user={props.user} />
      </Route>
      <Route path="/login">
        <Login updateUser={props.updateUser} />
      </Route>
      <Route path="/signup">
        <Signup updateUser={props.updateUser} />
      </Route>
      <Route path="/article/:slug">
        <Singlepost user={props.user} isLoggedIn={props.isLoggedIn} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;
