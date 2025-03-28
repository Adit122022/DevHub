import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import AdminPanel from "./components/pages/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Dashboard Route */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute roleRequired="admin" />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
