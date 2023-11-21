const deleteCollection = async (collectionId) => {
  try {
    const deleteRow = await fetch(`/api/v1/collections/${collectionId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ collectionId }),
    });
    return deleteRow;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};

export default deleteCollection;
