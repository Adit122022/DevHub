const API_URL = "/user"; // Uses proxy to avoid full backend URL

// ✅ Fetch User Profile
export const getUserProfile = async (userId, token) => {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Send token for authentication
    },
  });
  return res.json();
};

// ✅ Update User Profile
export const updateUserProfile = async (userId, token, userData) => {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return res.json();
};
