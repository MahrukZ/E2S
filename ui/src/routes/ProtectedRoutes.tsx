import { Navigate, Outlet } from "react-router-dom";
import { ISignedIn } from "../App";

interface ProtectedRoutesProps {
  signedIn: ISignedIn;
}

function ProtectedRoutes({ signedIn }: ProtectedRoutesProps) {
  return signedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoutes;
