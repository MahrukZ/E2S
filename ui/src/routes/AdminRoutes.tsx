import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UsersService } from "../services/users.service";

const AdminRoutes = () => {
  const usersService = new UsersService();

  const [adminStatus, setAdminStatus] = useState<boolean>();
  useEffect(() => {
    const getSignIn = async () => {
      const signedIn = await usersService.checkSignIn();
      if (signedIn["loggedIn"] === true) {
        if (signedIn["user"].role === "administrator") {
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
