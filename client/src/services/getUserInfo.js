const getUserInfo = async (userId) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}`);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const body = await response.json();
    return body.user;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};

export default getUserInfo;
