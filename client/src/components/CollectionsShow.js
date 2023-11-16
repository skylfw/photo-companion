import React, { useState, useEffect } from "react";
import getCollection from "../services/getCollection.js";

const CollectionShow = (props) => {
  const [collection, setCollection] = useState({
    title: "",
    description: "",
  });

  const collectionId = props.match.params.id;

  useEffect(() => {
    getCollection(collectionId).then((parseCollectionData) => {
      setCollection(parseCollectionData);
    });
  }, []);

  return (
    <div className="collection-container">
      {collection.title}
      <div>{collection.description}</div>
    </div>
  );
};

export default CollectionShow;
