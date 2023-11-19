import React, { useState } from "react";

const ProfileShow = (props) => {
  const [profile, setProfile] = useState({
    profileImg: "",
    username: "",
    expertise: "",
    description: "",
  });

  return (
    <div className="page-container">
      <img className="profile-pic" src={profile.image}></img>
      <h3>{profile.username}</h3>
      <h4>Expertise: {profile.expertise}</h4>
      <p>description: {profile.description}</p>
    </div>
  );
};

export default ProfileShow;
