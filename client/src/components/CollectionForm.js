import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";

const CollectionForm = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState([]);
  const [newCollection, setNewCollection] = useState({
    title: "",
    description: "",
  });
  const [selectedFiles, setSelectedFiles] = useState(null);

  const postCollection = async (newCollectionData) => {
    try {
      const formData = new FormData();
      formData.append("title", newCollectionData.title);
      formData.append("description", newCollectionData.description);
      for (const key of Object.keys(selectedFiles)) {
        formData.append("images", selectedFiles[key]);
      }
      const response = await fetch(`/api/v1/collections`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json();
          const newErrors = translateServerErrors(errorBody.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  if (shouldRedirect) {
    return <Redirect push to="/collections" />;
  }

  const handleInputChange = (event) => {
    setNewCollection({
      ...newCollection,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postCollection(newCollection);
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit}>
        <h2>Add a New Collection</h2>
        <ErrorList errors={errors} />
        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            value={newCollection.title}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newCollection.description}
          />
        </label>
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
        />
        <input className="submit-button landing-button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CollectionForm;
