function ProfileBanner(props) {
  return (
    <div className="profile-hero">
      <div>
        <img
          src={props.user.image || "/images/smiley.jpg"}
          alt={props.user.username}
        />
        <h2>{props.user.username}</h2>
      </div>
    </div>
  );
}

export default ProfileBanner;
