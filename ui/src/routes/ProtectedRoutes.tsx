import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  signedIn: boolean;
}

function ProtectedRoutes({ signedIn }: ProtectedRoutesProps) {
  return signedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoutes;
