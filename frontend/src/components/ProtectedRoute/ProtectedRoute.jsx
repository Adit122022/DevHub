import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roleRequired }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/" />;
  if (roleRequired && user?.role !== roleRequired) return <Navigate to="/dashboard" />;

  return <Outlet />;
};

export default ProtectedRoute;
