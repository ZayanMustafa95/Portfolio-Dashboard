import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Forget from "../pages/Forget";
import Otp from "../pages/Otp";
import NewPassword from "../pages/NewPassword";
import Dashboard from "../layouts/Dashboard";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import Blogs from "../pages/Blogs";

const Routers = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/new-password" element={<NewPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="blog" element={<Blogs />}/>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Routers;
