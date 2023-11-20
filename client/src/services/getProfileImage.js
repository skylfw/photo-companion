const getProfileImage = async (userId, newImageBody) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        Accept: "image/jpeg",
      },
      body: newImageBody,
    });
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    const { body } = await response.json();
    return body.profileImg;
  } catch (error) {
    console.error(`Error in addProfileImage Fetch: ${error.message}`);
  }
};

export default getProfileImage;
