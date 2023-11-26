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
        <img className="h-auto max-w-sm rounded-lg" src={`${img.imageUrl}`}></img>
      </div>
    );
  });

  return (
    <div className="page-container">
      <h1 className="text-9xl text-gray-500 text-center">{collection.title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-10 mt-5">
        {/* <div>{collection.description}</div> */}
        {list}
      </div>
    </div>
  );
};

export default CollectionShow;
