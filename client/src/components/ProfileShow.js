import React, { useState, useEffect } from "react";
import CollectionTile from "./CollectionTle";
import getProfileCollections from "../services/getProfileCollections";

const ProfileShow = (props) => {
  const [profile, setProfile] = useState({});
  const [userCollections, setUserCollections] = useState([]);

  const profileId = props.computedMatch.params.id;

  const getUserData = async (userId) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setProfile(body.user);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const collectionsListItems = userCollections.map((collectionItem) => {
    return (
      <CollectionTile
        key={collectionItem.id}
        collection={collectionItem}
        currentUser={props.user}
      ></CollectionTile>
    );
  });

  useEffect(() => {
    getUserData(profileId);
    getProfileCollections(profileId).then((value) => {
      setUserCollections(value);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="profile-show-container">
        <div className="profile-show-image-container">
          <img className="profile-show-image" src={profile.profileImg} />
        </div>
        <div className="profile-show-detail-container">
          <h2 className="profile-show-username-text">{profile.username}</h2>
          <p className="profile-show-expertise-text">{profile.expertise}</p>
        </div>

        <div className="profile-show-button-container">
          <a href={`mailto:${profile.email}`} className="message-button">
            Message
          </a>
        </div>
      </div>
      <div className="collections-container">
        <div className="collections-grid">{collectionsListItems}</div>
      </div>
    </div>
  );
};

export default ProfileShow;
