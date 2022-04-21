import { Link } from "react-router-dom";

function FeedNav(props) {
  return (
    <div className="feed">
      <ul className="flex">
        <li onClick={props.removeTab}>
          <Link to="/" className={props.activeTab === "" ? "active" : ""}>
            Global Feed
          </Link>
        </li>
        {props.activeTab && (
          <li className={props.activeTab ? "active" : ""}>
            #{props.activeTab}
          </li>
        )}
      </ul>
    </div>
  );
}

export default FeedNav;
