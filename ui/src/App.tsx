import Axios from "axios";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ProtectedRoutes from "../src/routes/ProtectedRoutes";
import "./App.css";

import Sidebar from "./components/reusable/sidebar/Sidebar";
import Topbar from "./components/reusable/topbar/Topbar";

import BillValidation from "./components/pages/BillValidation";
import CostForecast from "./components/pages/CostForecast";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Reports from "./components/pages/Reports";
import SignIn from "./components/pages/signIn/SignIn";

import UploadPage from "./components/pages/admin/upload/UploadPage";
import UserManagementPage from "./components/pages/admin/userManagement/UserManagementPage";

import { UsersService } from "./services/users.service";

const App: React.FunctionComponent = () => {
  Axios.defaults.withCredentials = true;

  //Defines the paths of each page
  //This file should only have the topbar and sidebar
  return (
    <>
      <Router>
        <Topbar />
        <Sidebar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/reports" element={<Reports />} />
            <Route path="/billvalidation" element={<BillValidation />} />
            <Route path="/costforecast" element={<CostForecast />} />
          </Route>
          <Route path="/" element={<Dashboard />} />

          <Route path="/sign-in" element={<SignIn />} />

          {/* admin routes */}
          <Route path="/admin/upload" element={<UploadPage />} />
          <Route
            path="/admin/user-management"
            element={<UserManagementPage />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
