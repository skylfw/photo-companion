import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CollectionTile from "./CollectionTle";

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
    return <CollectionTile key={collectionItem.id} collection={collectionItem}></CollectionTile>;
  });

  console.log(collections);

  return (
    <div className="page-container">
      <div className="collections-container">
        <div className="collections-grid">{collectionsListItems}</div>
      </div>
    </div>
  );
};

export default CollectionsList;
