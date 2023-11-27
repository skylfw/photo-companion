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
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            className="object-cover object-top w-full"
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt="Mountain"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img className="object-cover object-center h-32" src={profile.profileImg} />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{profile.username}</h2>
          <p className="text-gray-500">{profile.expertise}</p>
        </div>

        <div className="p-4 border-t mx-8 mt-2">
          <a
            href={`mailto:${profile.email}`}
            className="w-1/2 block mx-auto rounded-full text-center bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
          >
            Message
          </a>
        </div>
      </div>
      <div className="collections-container">
        <div className="collections-grid mt-5">{collectionsListItems}</div>
      </div>
    </div>
  );
};

export default ProfileShow;
