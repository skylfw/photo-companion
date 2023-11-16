import React, { useState, useEffect } from "react";
import getCollection from "../services/getMovie.js";

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

  return <>{collection.title}</>;
};

export default CollectionShow;
