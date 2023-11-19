import React from "react";
import { Link } from "react-router-dom";

const ProfileTile = ({ profile }) => {
  return (
    <Link to={`/users/${profile.id}`}>
      <div>{profile.username}</div>
    </Link>
  );
};

export default ProfileTile;
