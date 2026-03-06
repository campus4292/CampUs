import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import MyRequests from "./pages/MyRequests";
import StudentLayout from "./layout/StudentLayout";
import FacultyLayout from "./layout/FacultyLayout";
import AdminLayout from "./layout/AdminLayout";
import Academic from "./pages/Academic";
import Emergency from "./pages/Emergency";
import Wallet from "./pages/Wallet";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OutsiderDashboard from "./pages/OutsiderDashboard";
import Exchange from "./pages/Exchange";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/" element={<Auth />} />
        <Route path="/oauth-success" element={<Auth />} />

        {/* STUDENT */}
/* STUDENT */
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
        <Route index element={<StudentDashboard />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="academic" element={<Academic />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="wallet" element={<Wallet />} />          <Route path="myrequests" element={<MyRequests />} />
        </Route>
        
        {/* FACULTY */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<FacultyDashboard />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* OUTSIDER */}
        <Route
          path="/outsider"
          element={
            <ProtectedRoute allowedRoles={["outsider"]}>
              <OutsiderDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;