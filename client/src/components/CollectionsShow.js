import React, { useState, useEffect } from "react";
import getCollection from "../services/getCollection.js";

const CollectionShow = (props) => {
  const [collection, setCollection] = useState({
    title: "",
    description: "",
    coverImage: "",
    photos: [],
  });

  const collectionId = props.match.params.id;

  useEffect(() => {
    getCollection(collectionId).then((parseCollectionData) => {
      setCollection(parseCollectionData);
    });
  }, []);

  const list = collection.photos.map((img) => {
    return (
      <div key={img.id}>
        <img className="gallery-img" src={`${img.imageUrl}`}></img>
      </div>
    );
  });

  return (
    <div className="page-container">
      <h1>{collection.title}</h1>
      <div>{collection.description}</div>
      <div>{list}</div>
    </div>
  );
};

export default CollectionShow;
