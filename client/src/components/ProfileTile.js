import React from "react";
import { Link } from "react-router-dom";

const ProfileTile = ({ profile }) => {
  return (
    <div className="profile-card">
      <Link to={`/users/${profile.id}`} className="profile-link">
        <div className="collection-card">
          <img src={`${profile.profileImg}`} />
          <div className="collection-card-content">
            <div className="collection-card-title">{profile.username}</div>
            <p className="collection-card-text">{profile.location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfileTile;
