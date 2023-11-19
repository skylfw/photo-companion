import React, { useEffect, useState } from "react";
import ProfileTile from "./ProfileTile";

const UsersList = () => {
  const [users, setUsers] = useState([]);

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

  return <div className="page-container">{usersProfileList}</div>;
};

export default UsersList;
