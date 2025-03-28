import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // Store JWT
      navigate("/dashboard"); // Redirect to dashboard after login
    }
  }, [location, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Redirects to Google OAuth
  };

  return (
    <div className=" flex flex-col gap-60 items-center justify-center h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-8">
      {/* Title & Description */}
      <div className="text-center ">
        <h2 className="md:text-5xl text-2xl font-extrabold text-gray-800 dark:text-white">
          Welcome Back 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-300 md:text-lg text-sm leading-relaxed">
          Sign in to access all features of{" "}
          <span className="text-red-500 font-semibold">DevHub</span>.
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white dark:bg-gray-800 py-12 px-10  shadow-2xl w-fit
      padding max-w-md text-center backdrop-blur-lg bg-opacity-30">
        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-5 w-full padding rounded text-white text-lg font-medium  shadow-lg  transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <FcGoogle className="w-7 h-7 mr-3" />
          Continue with Google
        </button>

        
      </div>
      {/* Terms & Conditions */}
      <p className="md:text-sm text-xs text-gray-500 dark:text-gray-400">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms & Conditions
          </a>.
        </p>
    </div>
  );
};

export default Login;
