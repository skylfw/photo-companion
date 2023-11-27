const getCollections = async (userId) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}/collections`);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const body = await response.json();
    console.log(body);
    setUserCollections(body.collections);
    return body;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};

export default getCollections;
