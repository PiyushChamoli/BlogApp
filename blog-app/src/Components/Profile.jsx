import { NavLink } from "react-router-dom";

function Profile() {
  return (
    <div className="container">
      <div className="profile-hero">
        <div>
          <img src="/image/smiley.jpg" alt="profileimg" />
          <h2>Username</h2>
          <NavLink className="unselected btn" to="/settings">
            <i class="fa fa-cog" aria-hidden="true"></i>&nbsp; Edit Profile
            Settings
          </NavLink>
        </div>
      </div>
      <div className="article-heading">
        <ul className="flex">
          <li>
            <NavLink
              className={(isActive) =>
                "active-nav" + (!isActive ? " unselected" : "")
              }
              to="/"
            >
              My Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(isActive) =>
                "active-nav" + (!isActive ? " unselected" : "")
              }
              to="/"
            >
              Favourite Articles
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default Profile;
