import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UsersService } from "../services/users.service";

const ProtectedRoutes = () => {
  const usersService = new UsersService();

  const [signInStatus, setSignInStatus] = useState();
  useEffect(() => {
    const getSignIn = async () => {
      const signedIn = await usersService.checkSignIn();
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
