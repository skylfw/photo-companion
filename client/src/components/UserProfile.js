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
    <div className="container mx-auto my-60">
      <form>
        <div>
          <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center" onClick={handleImageClick}>
              <img
                src={props.user.profileImg}
                className="profile-image rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="mt-16">
              <h1 className="font-bold text-center text-3xl text-gray-900">
                {props.user.username}
              </h1>
              <div className="text-center">
                {isLocationEditMode ? (
                  <input
                    type="text"
                    value={editedLocation}
                    onChange={handleLocationChange}
                    onBlur={handleLocationBlur}
                    className="text-center text-sm mt-1 text-gray-400 font-medium focus:outline-none"
                  />
                ) : (
                  <p
                    className="text-center text-sm mt-1 text-gray-400 font-medium"
                    onDoubleClick={handleLocationDoubleClick}
                  >
                    {props.user.location}
                  </p>
                )}
              </div>
              <div className="text-center text-sm mt-1 text-gray-400 font-medium">
                {props.user.description}
              </div>
              <div className="text-center text-sm text-gray-400 font-medium">
                {props.user.expertise}
              </div>

              <div className="flex justify-center my-5 px-6">
                <button
                  type="button"
                  className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-20 py-3 ml-1 mr-1 bg-gray-900 hover:bg-black hover:text-white"
                  onClick={saveProfileChange}
                >
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
