import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CollectionsList = (props) => {
  const [collections, setCollections] = useState([]);
  const [coverImage, setCoverImage] = useState(null);

  const getCollections = async () => {
    try {
      const response = await fetch(`/api/v1/collections`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setCollections(body.collections);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const collectionsListItems = collections.map((collectionItem) => {
    return (
      <div key={collectionItem.id}>
        <Link to={`/collections/${collectionItem.id}`}>
          <div className="collection-card">
            <img className="collection-card" src={`${collectionItem.coverImage}`} />
            <div className="collection-card-content">
              <div className="collection-card-title">{collectionItem.title}</div>
              <p className="collection-card-text">{collectionItem.username}</p>
              <p className="collection-card-text">{collectionItem.description}</p>
            </div>
          </div>
        </Link>
        {/* <img src={`${collectionItem.photos[0].imageUrl}`} /> */}
      </div>
    );
  });

  console.log(collections);

  return (
    <div className="collections-container">
      <div className="collections-grid">{collectionsListItems}</div>
    </div>
  );
};

export default CollectionsList;
