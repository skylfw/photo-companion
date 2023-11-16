import React, { useState, useEffect } from "react";

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

  const collectionsListItems = collections.map((collectionItem) => {
    return <li key={collectionItem.id}>{collectionItem.title}</li>;
  });

  return (
    <div className="collections-container text-center">
      <ul>{collectionsListItems}</ul>
    </div>
  );
};

export default CollectionsList;
