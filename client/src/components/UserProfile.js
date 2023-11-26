import React, { useState, useRef } from "react";
import getProfileImage from "../services/getProfileImage";

const UserProfile = (props) => {
  const [imageData, setImageData] = useState({
    profileImg: {},
  });

  const [isLocationEditMode, setIsLocationEditMode] = useState(false);
  const [editedLocation, setEditedLocation] = useState(props.user.location);

  const fileInputRef = useRef(null);

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
    const newImageBody = new FormData();
    newImageBody.append("profileImg", imageData.profileImg);
    const profilePic = await getProfileImage(props.user.id, newImageBody);
    props.setCurrentUser({
      ...props.user,
      profileImg: profilePic,
    });
  };

  const handleLocationDoubleClick = () => {
    setIsLocationEditMode(true);
  };

  const handleLocationChange = (event) => {
    setEditedLocation(event.target.value);
  };

  const handleLocationBlur = () => {
    setIsLocationEditMode(false);
    // Perform any additional logic you need with the edited location
  };

  return (
    <div className="container mx-auto my-60">
      <form>
        <div>
          <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
            <div className="flex justify-center" onClick={handleImageClick}>
              <img
                src={props.user.profileImg}
                className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
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
                {/* <a
                href="#"
                className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-20 py-3 ml-1 mr-1 bg-gray-900 hover:bg-black hover:text-white"
              >
                Message
              </a> */}

                <button
                  type="button"
                  className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-20 py-3 ml-1 mr-1 bg-gray-900 hover:bg-black hover:text-white"
                  onClick={saveProfileChange}
                >
                  Save Profile Change
                </button>
              </div>

              {/* <div className="flex justify-between items-center my-5 px-6">
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Facebook
              </a>
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Twitter
              </a>
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Instagram
              </a>
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
              >
                Email
              </a>
            </div> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
