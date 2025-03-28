import React, { useEffect, useState } from "react";
import { Home, Settings, User, LogOut } from "lucide-react";
import Logout from "./Logout";
import EditProfile from "./EditProfile";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState("Profile");

  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) throw new Error("No authentication token found");

        const response = await fetch("http://localhost:5000/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        setUser(data);
        setRole(data.role);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    const fetchFollowData = async () => {
      try {
        if (!user) return;

        const res = await fetch(`http://localhost:5000/api/user/${user._id}/followers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch followers");

        const data = await res.json();
        setFollowers(data.followers);
        setFollowing(data.following);
        setIsFollowing(data.followers.includes(loggedInUserId));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFollowData();
  }, [user]);

  const handleFollowToggle = async () => {
    try {
      if (!user || !user._id) return;

      const url = `http://localhost:5000/api/user/${isFollowing ? "unfollow" : "follow"}/${user._id}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to ${isFollowing ? "unfollow" : "follow"}`);

      setIsFollowing((prev) => !prev);
      setFollowers((prev) =>
        isFollowing ? prev.filter((id) => id !== loggedInUserId) : [...prev, loggedInUserId]
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 hidden md:block">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h2>
        <nav className="space-y-4">
          {role === "admin" && (
            <button onClick={() => setActiveTab("AdminPanel")} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500">
              <Settings className="w-5 h-5 mr-2" /> Admin Panel
            </button>
          )}
          <button onClick={() => setActiveTab("Home")} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500">
            <Home className="w-5 h-5 mr-2" /> Home
          </button>
          <button onClick={() => setActiveTab("Profile")} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500">
            <User className="w-5 h-5 mr-2" /> Profile
          </button>
          <button onClick={() => setActiveTab("Settings")} className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500">
            <Settings className="w-5 h-5 mr-2" /> Settings
          </button>
          <button className="flex items-center text-red-500 hover:text-red-700">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : activeTab === "Profile" && user ? (
            <div className="text-center flex justify-between w-full padding items-center">
              <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <div className="text-left">
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
                <h2 className="text-sm font-bold text-gray-800 dark:text-gray-400">{user.bio}</h2>
                <button 
                  onClick={() => setActiveTab("EditProfile")}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Edit Profile
                </button>
              </div>
              <div>
                <button 
                  onClick={() => setActiveTab("Followers")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Followers: {followers.length}
                </button>
                <button 
                  onClick={() => setActiveTab("Following")}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Following: {following.length}
                </button>
                {user._id !== loggedInUserId && (
                  <button
                    onClick={handleFollowToggle}
                    className={`mt-4 px-4 py-2 rounded-md ${
                      isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
              <div className="mt-6">
                <Logout />
              </div>
            </div>
          ) : activeTab === "EditProfile" ? (
            <EditProfile user={user} setUser={setUser} setActiveTab={setActiveTab} />
          ) : activeTab === "AdminPanel" && role === "admin" ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold">Welcome, Admin</h2>
              <p>Manage users, posts, and more here.</p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">{activeTab} Page Coming Soon...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
