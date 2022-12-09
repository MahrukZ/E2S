import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/reusable/sidebar/Sidebar";
import Topbar from "./components/reusable/topbar/Topbar";

import BillValidation from "./components/pages/BillValidation";
import CostForecast from "./components/pages/CostForecast";
import { UsersService } from "./services/users.service";
import Reports from "./components/pages/Reports";
import SignIn from "./components/pages/signIn/SignIn";

import AdminRoutes from "../src/routes/AdminRoutes";
import ProtectedRoutes from "../src/routes/ProtectedRoutes";
import Dashboard from "./components/pages/Dashboard";

import UploadPage from "./components/pages/admin/upload/UploadPage";
import UserManagementPage from "./components/pages/admin/userManagement/UserManagementPage";

const App: React.FunctionComponent = () => {
    Axios.defaults.withCredentials = true;

    const [currentSite, setCurrentSite] = useState<number>(1);

    const usersService = new UsersService();

    //Defines the paths of each page
    //This file should only have the topbar and sidebar
    return (
        <>
            <Router>
                <Topbar
                    setCurrentSite={setCurrentSite}
                    currentSite={currentSite}
                />
                <Sidebar />
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/reports" element={<Reports />} />
                        <Route
                            path="/billvalidation"
                            element={<BillValidation />}
                        />
                        <Route
                            path="/costforecast"
                            element={<CostForecast />}
                        />
                        <Route
                            path="/"
                            element={<Dashboard currentSite={currentSite} />}
                        />
                    </Route>
                    {/* admin routes */}
                    <Route element={<AdminRoutes />}>
                        <Route path="/admin/upload" element={<UploadPage />} />
                        <Route
                            path="/admin/user-management"
                            element={<UserManagementPage />}
                        />
                    </Route>
                    <Route path="/sign-in" element={<SignIn />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
