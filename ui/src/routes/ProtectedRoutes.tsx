import React from "react";
import { UsersService } from "../services/users.service";
import { BrowserRouter as Redirect, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoutes = () => {
  const usersService = new UsersService();

  const [signInStatus, setSignInStatus] = useState();
  useEffect(() => {
    const getSignIn = async () => {
      const signedIn = await usersService.checkSignIn();
      console.log("sign in status: ", signedIn);
      setSignInStatus(signedIn["loggedIn"]);
    };
    getSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (signInStatus === false) {
    return <Navigate to="/sign-in" />;
  }
  if (signInStatus === true) {
    return <Outlet />;
  }
  return <>Still loading...</>;
};

export default ProtectedRoutes;
