import React from "react";
import { Link } from "react-router-dom";
import deleteCollection from "../services/deleteCollection";

const CollectionTile = ({ collection, onDelete, currentUser }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteCollection(collection.id);
      if (response.status === 200) {
        onDelete(collection.id);
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  let deleteButton;
  if (currentUser && currentUser.username === collection.username) {
    deleteButton = (
      <button className="delete-button submit-button" onClick={handleDelete}>
        Delete
      </button>
    );
  }

  return (
    <div key={collection.id}>
      <Link to={`/collections/${collection.id}`}>
        <div className="collection-card">
          <img className="collection-card" src={`${collection.coverImage}`} />
          <div className="collection-card-content">
            <div className="collection-card-title">{collection.title}</div>
            <p className="collection-card-text">{collection.username}</p>
            <p className="collection-card-text">{collection.description}</p>
          </div>
        </div>
      </Link>
      {deleteButton}
    </div>
  );
};

export default CollectionTile;
