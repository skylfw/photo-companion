import React, { useState, useEffect } from "react";
import getCollection from "../services/getCollection.js";

const CollectionShow = (props) => {
  const [collection, setCollection] = useState({
    title: "",
    description: "",
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

  // console.log(collection.imgUrls);
  return (
    <div className="collection-container">
      {collection.title}
      <div>{collection.description}</div>
      <div>{list}</div>
    </div>
  );
};

export default CollectionShow;
