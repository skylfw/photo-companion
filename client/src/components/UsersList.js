import React, { useEffect, useState } from "react";
import ProfileTile from "./ProfileTile";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      if (searchQuery.trim() === "") {
        setSearchUsers([]);
      } else {
        const response = await axios.get(`/api/v1/users/search/location?location=${searchQuery}`);
        const searchedUsers = response.data.users;
        setSearchUsers(searchedUsers);
      }
    } catch (error) {
      console.error("Error searching users by location:", error);
    }
  };

  const getUsersData = async () => {
    try {
      const response = await fetch(`/api/v1/users`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setUsers(body.users);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const usersProfileList = users.map((profile) => {
    return <ProfileTile key={profile.id} profile={profile} />;
  });

  const searchedUsersList = searchUsers.map((profile) => {
    return <ProfileTile key={profile.id} profile={profile} />;
  });

  return (
    <div className="page-container">
      <div className="users-page-container">
        <div className="search-bar-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Location"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div>
          {searchUsers.length === 0 ? (
            <div className="users-list-container">{usersProfileList}</div>
          ) : (
            <div className="users-list-container">{searchedUsersList}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
