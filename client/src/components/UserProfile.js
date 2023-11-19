import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import getProfileImage from "../services/getProfileImage";

const UserProfile = (props) => {
  const [imageData, setImageData] = useState({
    profileImg: {},
  });

  const handleImageUpload = (acceptedImage) => {
    setImageData({
      ...imageData,
      profileImg: acceptedImage[0],
    });
  };

  const addProfileImage = async (event) => {
    event.preventDefault();
    const newImageBody = new FormData();
    newImageBody.append("profileImg", imageData.profileImg);
    const profilePic = await getProfileImage(props.user.id, newImageBody);
    props.setCurrentUser({
      ...props.user,
      profileImg: profilePic,
    });
  };

  return (
    <div className="page-container">
      <img className="profile-pic" src={props.user.profileImg}></img>
      <form onSubmit={addProfileImage}>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drag-n-drop">
                  <p>Upload A Picture - drag 'n' drop or click to upload</p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <input className="submit-pic-button" type="submit"></input>
      </form>
      <h3>{props.user.username}</h3>
      <p>{props.user.email}</p>
      <p>{props.user.description}</p>
      <p>{props.user.expertise}</p>
    </div>
  );
};

export default UserProfile;
