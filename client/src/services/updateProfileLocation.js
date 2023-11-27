const updateProfileLocation = async (userId, newLocation) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}/location`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: newLocation }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update location: ${response.statusText}`);
    }

    const updatedUserData = await response.json();
    console.log(updatedUserData);
    return updatedUserData;
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
};

export default updateProfileLocation;
