import React, { useState, useEffect } from "react";
import getUserInfo from "../services/getUserInfo";

const ProfileShow = (props) => {
  const [profile, setProfile] = useState({});

  const userId = props.match.params.id;

  useEffect(() => {
    getUserInfo(userId).then((parseUserData) => {
      setProfile(parseUserData);
    });
  }, []);

  return (
    <div className="page-container">
      <img className="profile-pic" src={profile.profileImg}></img>
      <h3>{profile.username}</h3>
      <h4>{profile.email}</h4>
      <h4>Location: {profile.location}</h4>
      <h4>Expertise: {profile.expertise}</h4>
      <p>description: {profile.description}</p>
    </div>
  );
};

export default ProfileShow;
