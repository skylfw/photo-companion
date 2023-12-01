import React, { useState, useRef, useEffect } from "react";
import getProfileImage from "../services/getProfileImage";
import updateProfileLocation from "../services/updateProfileLocation";
import CollectionTile from "./CollectionTle";
import getProfileCollections from "../services/getProfileCollections";

const UserProfile = (props) => {
  const [imageData, setImageData] = useState({
    profileImg: {},
  });

  const [isLocationEditMode, setIsLocationEditMode] = useState(false);
  const [editedLocation, setEditedLocation] = useState(props.user.location);
  const [userCollections, setUserCollections] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getProfileCollections(props.user.id).then((value) => setUserCollections(value));
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setImageData({
      ...imageData,
      profileImg: event.target.files[0],
    });
  };

  const saveProfileChange = async (event) => {
    event.preventDefault();
    if (imageData.profileImg) {
      const newImageBody = new FormData();
      newImageBody.append("profileImg", imageData.profileImg);
      const profilePic = await getProfileImage(props.user.id, newImageBody);
      props.setCurrentUser({
        ...props.user,
        profileImg: profilePic,
      });
    }

    props.setCurrentUser((prevUser) => ({
      ...prevUser,
      location: editedLocation,
    }));

    try {
      await updateProfileLocation(props.user.id, editedLocation);
    } catch (error) {
      console.error("Error updating location on the backend", error);
    }
    setEditedLocation(props.user.location);
  };

  const handleLocationDoubleClick = () => {
    setIsLocationEditMode(true);
  };

  const handleLocationChange = (event) => {
    setEditedLocation(event.target.value);
  };

  const handleLocationBlur = () => {
    setIsLocationEditMode(false);
  };

  const handleCollectionDelete = (deletedCollectionId) => {
    setUserCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.id !== deletedCollectionId)
    );
  };

  const collectionsListItems = userCollections.map((collectionItem) => {
    return (
      <CollectionTile
        key={collectionItem.id}
        collection={collectionItem}
        currentUser={props.user}
        onDelete={handleCollectionDelete}
      ></CollectionTile>
    );
  });

  return (
    <div className="users-profile-page-container">
      <form>
        <div>
          <div className="user-profile-container">
            <div className="profile-image-container" onClick={handleImageClick}>
              <img src={props.user.profileImg} className="profile-image" />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="profile-detail-container ">
              <h1 className="profile-username-text">{props.user.username}</h1>
              <div className="center-text">
                {isLocationEditMode ? (
                  <input
                    type="text"
                    value={editedLocation}
                    onChange={handleLocationChange}
                    onBlur={handleLocationBlur}
                    className="profile-location-text"
                  />
                ) : (
                  <p className="profile-detail-text" onDoubleClick={handleLocationDoubleClick}>
                    {props.user.location}
                  </p>
                )}
              </div>
              <div className="profile-detail-text">{props.user.description}</div>
              <div className="profile-detail-text">{props.user.expertise}</div>

              <div className="profile-button-container">
                <button type="button" className="save-profile-button" onClick={saveProfileChange}>
                  Save Profile Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="collections-grid">{collectionsListItems}</div>
    </div>
  );
};

export default UserProfile;
