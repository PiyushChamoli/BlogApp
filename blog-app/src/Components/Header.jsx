import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header-nav">
      <nav className="container flex justify-between align-center">
        <img src="/images/logo.svg" alt="altcampus" className="header-logo" />
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
      </nav>
    </header>
  );
}

export default Header;
