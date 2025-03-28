import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../api/userApi";

const Profile = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const token = localStorage.getItem("token"); // Get token from local storage

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserProfile(id, token);
      setUser(data);
      setFormData({ name: data.name || "", bio: data.bio || "" });
    };
    fetchUser();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await updateUserProfile(id, token, formData);
    setUser(updatedUser);
  };

  return (
    <div className=" profile max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <img
        src={user.profilePicture || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
