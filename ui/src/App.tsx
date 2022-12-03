import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from "axios";
import { UsersService } from "./services/users.service";

import Sidebar from './components/reusable/sidebar/Sidebar';
import Topbar from './components/reusable/topbar/Topbar';

import Dashboard from './components/pages/dashboard/Dashboard';
import Reports from './components/pages/Reports';
import BillValidation from './components/pages/BillValidation';
import CostForecast from './components/pages/CostForecast';
import SignIn from './components/pages/signIn/SignIn';

import UploadPage from './components/pages/admin/upload/UploadPage';
import UserManagementPage from './components/pages/admin/userManagement/UserManagementPage';

const App: React.FunctionComponent = () => {

  Axios.defaults.withCredentials = true;
  
  //Defines the paths of each page
  //This file should only have the topbar and sidebar
  return (
    <>
      <div className="App">
         <Topbar />
      </div>

      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/reports' element={<Reports />} />            
          <Route path='/billvalidation' element={<BillValidation />} />    
          <Route path='/costforecast' element={<CostForecast />} />
          <Route path='/sign-in' element={<SignIn />} />

          {/* admin routes */}
          <Route path='/admin/upload' element={<UploadPage />} />
          <Route path='/admin/user-management' element={<UserManagementPage />} />
        </Routes>
      </Router> 
    </>
  );
}

export default App;
