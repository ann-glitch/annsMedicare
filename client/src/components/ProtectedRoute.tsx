import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import API from "../api/axios";

interface ProtectedRoutesProps {
  requiredRoles: string[];
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ requiredRoles }) => {
  const navigate = useNavigate()
  const {setUser} = useAuth()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get("/auth/me");
        console.log(response.data)
        if (response.status !== 200) navigate("/")
        setUser(response.data.data)
        if (requiredRoles.length > 0 && response.data.data && !requiredRoles.includes(response.data.data.role)) {
          navigate("/")
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        navigate("/")
      }
    };

    fetchUser()
  }, [navigate])

  return <Outlet />;
};

export default ProtectedRoutes;
