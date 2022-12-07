import React from "react";
import { UsersService } from "../services/users.service";
import { BrowserRouter as Redirect, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminRoutes = () => {
  const usersService = new UsersService();

  const [adminStatus, setAdminStatus] = useState<boolean>();
  useEffect(() => {
    const getSignIn = async () => {
      const signedIn = await usersService.checkSignIn();
      console.log("checking sign in admin routes");
      if (signedIn["loggedIn"] === true) {
        if (signedIn["user"].role == "administrator") {
          setAdminStatus(true);
        } else {
          setAdminStatus(false);
        }
      } else {
        setAdminStatus(false);
      }
    };
    getSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (adminStatus === false) {
    return <Navigate to="/sign-in" />;
  }
  if (adminStatus === true) {
    return <Outlet />;
  }
  return <>Still loading...</>;
};

export default AdminRoutes;
