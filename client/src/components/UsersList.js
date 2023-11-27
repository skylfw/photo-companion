// import React, { useEffect, useState } from "react";
// import ProfileTile from "./ProfileTile";
// import axios from "axios";

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchUsers, setSearchUsers] = useState([]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (searchQuery.trim() === "") {
//         setSearchUsers([]);
//       } else {
//         const response = await axios.get(`/api/v1/users/search/location?location=${searchQuery}`);
//         const searchedUsers = response.data.users;
//         setSearchUsers(searchedUsers);
//       }
//     } catch (error) {
//       console.error("Error searching users by location:", error);
//     }
//   };

//   const getUsersData = async () => {
//     try {
//       const response = await fetch(`/api/v1/users`);
//       if (!response.ok) {
//         const errorMessage = `${response.status} (${response.statusText})`;
//         const error = new Error(errorMessage);
//         throw error;
//       }
//       const body = await response.json();
//       setUsers(body.users);
//     } catch (err) {
//       console.error(`Error in fetch: ${err.message}`);
//     }
//   };

//   useEffect(() => {
//     getUsersData();
//   }, []);

//   const usersProfileList = users.map((profile) => {
//     return <ProfileTile key={profile.id} profile={profile} />;
//   });

//   const searchedUsersList = searchUsers.map((profile) => {
//     return <ProfileTile key={profile.id} profile={profile} />;
//   });

//   return (
//     <div className="page-container">
//       <div className="users-page-container">
//         <div className="search-bar-container">
//           <form onSubmit={handleSearchSubmit} className="search-form">
//             <input
//               type="text"
//               placeholder="Location"
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//             <button type="submit">Search</button>
//           </form>
//         </div>
//         <div>
//           {searchUsers.length === 0 ? (
//             <div className="users-list-container">{usersProfileList}</div>
//           ) : (
//             <div className="users-list-container">{searchedUsersList}</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersList;

////////// v2

import React, { useEffect, useState } from "react";
import ProfileTile from "./ProfileTile";
import Select from "react-select";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const handleSearchChange = (selectedOption) => {
    setSearchQuery(selectedOption?.value || "");
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      if (searchQuery.trim() === "") {
        setSearchUsers([]);
      } else {
        const response = await fetch(`/api/v1/users/search/location?location=${searchQuery}`);
        const body = await response.json();
        const searchedUsers = body.users;
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

  const getLocationOptions = async () => {
    try {
      const response = await fetch("/api/v1/users/locations");
      const body = await response.json();
      const locations = body.locations;
      const options = locations.map((location) => ({ value: location, label: location }));
      return options;
    } catch (error) {
      console.error("Error fetching location options:", error);
    }
  };

  useEffect(() => {
    getUsersData();
    getLocationOptions().then((value) => setLocationOptions(value));
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
            <Select
              className="search-bar"
              options={locationOptions}
              isClearable
              placeholder="Select Location"
              value={locationOptions.find((option) => option.value === searchQuery)}
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
