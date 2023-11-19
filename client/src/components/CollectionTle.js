import React from "react";
import { Link } from "react-router-dom";

const CollectionTile = ({ collection }) => {
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
      {/* <img src={`${collectionItem.photos[0].imageUrl}`} /> */}
    </div>
  );
};

export default CollectionTile;
