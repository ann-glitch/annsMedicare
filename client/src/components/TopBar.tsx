import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import API from "../api/axios";
import { User } from "../types";

const TopBar: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.token) {
        try {
          const response = await API.get(`/auth/me`);

          setUserData(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div className="w-full flex items-center justify-between pb-4 border-b border-gray-200">
      <h2 className="text-2xl font-bricolage">
        {user?.role === "officer" ? "Appointments Overview" : "My Appointments"}
      </h2>

      <div className="flex gap-2 items-center pr-4">
        <div className="bg-red-200 rounded-full w-[50px] h-[50px]">&nbsp;</div>
        <div className="">
          <p className="font-bold">{userData?.name}</p>
          <p className="text-sm">
            {user?.role === "officer" ? "Consultation Officer" : "Patient"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;