import React, { useState, useEffect } from "react";
import CollectionTile from "./CollectionTle";

const CollectionsList = (props) => {
  const [collections, setCollections] = useState([]);

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

  const handleCollectionDelete = (deletedCollectionId) => {
    setCollections((prevCollections) =>
      prevCollections.filter((collection) => collection.id !== deletedCollectionId)
    );
  };

  const collectionsListItems = collections.map((collectionItem) => {
    return (
      <CollectionTile
        key={collectionItem.id}
        collection={collectionItem}
        onDelete={handleCollectionDelete}
        currentUser={props.user}
      ></CollectionTile>
    );
  });

  return (
    <div className="page-container">
      <div className="collections-container">
        <div className="collections-grid">{collectionsListItems}</div>
      </div>
    </div>
  );
};

export default CollectionsList;
