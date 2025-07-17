import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PostList from "../pages/posts/PostList";
import PostForm from "../pages/posts/PostForm";
import PostDetails from "../pages/posts/PostDetails";
import DashboardLayout from "../components/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<PostList />} />
          <Route path="create" element={<PostForm />} />
          <Route path="edit/:id" element={<PostForm edit />} />
          <Route path="posts/:id" element={<PostDetails />} />
        </Route>
      </Route>

      {/* Redirect root "/" to login or dashboard */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
