import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header className="header-nav">
      <nav className="container flex justify-between align-center">
        <img src="/images/logo.svg" alt="altcampus" className="header-logo" />
        {props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
      </nav>
    </header>
  );
}

function NonAuthHeader() {
  return (
    <ul className="flex">
      <li>
        <NavLink to="/" activeclassname="active" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" activeclassname="active">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/signup" activeclassname="active">
          Signup
        </NavLink>
      </li>
    </ul>
  );
}

function AuthHeader() {
  return (
    <ul className="flex">
      <li>
        <NavLink to="/" activeclassname="active" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/new-post" activeclassname="active">
          New Article
        </NavLink>
      </li>
      <li>
        <NavLink to="/setting" activeclassname="active">
          Setting
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" activeclassname="active">
          Profile
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;
