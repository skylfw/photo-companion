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
    <div className="flex items-center justify-center h-screen">
      <div className=" bg-white p-5 max-w-lg rounded-lg">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="m-7">
            <h2 className="text-center text-2xl mb-5">Add a New Collection</h2>
            <ErrorList errors={errors} />
            <div className="mb-5">
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  type="text"
                  name="title"
                  onChange={handleInputChange}
                  value={newCollection.title}
                  placeholder="Title"
                />
              </label>
            </div>
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              <input
                className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                type="text"
                name="description"
                onChange={handleInputChange}
                value={newCollection.description}
                placeholder="Description"
              />
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              type="file"
              multiple
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
            />
            <input className="submit-button mt-3" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionForm;
