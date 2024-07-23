import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRoutesProps {
  requiredRoles: string[];
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ requiredRoles }) => {
  const { user } = useAuth();

  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // if required roles does not include user role
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
