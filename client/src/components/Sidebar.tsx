import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import { FaCalendar } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <div className="flex flex-col h-screen p-4">
      {/* logo */}
      <div className="w-full pb-8">
        <img
          src="/images/annsMedicare.png"
          alt="Anncare Logo"
          className="h-[14px] sm:h-[28px] object-cover"
        />
      </div>

      {/* dynamically list items depending on user role */}
      <ul className="flex-1 flex flex-col gap-2">
        {user?.role === "officer" && (
          <li className="p-3 text-white bg-primaryGreen flex gap-1 items-center rounded-md">
            <MdOutlineDashboard size={24} />
            <p className="hidden sm:block">Appointments Overview</p>
          </li>
        )}
        {user?.role === "user" && (
          <li className="p-3 text-white bg-primaryBlue flex gap-1 items-center rounded-md">
            <FaCalendar size={24} />
            <p className="hidden sm:block">My Appointments</p>
          </li>
        )}
      </ul>

      <div className="mb-20">
        <button
          className="p-3 text-lg flex gap-1 items-center bg-gray-100 w-full rounded-md"
          onClick={logout}
        >
          <IoLogOutOutline size={24} />
          <p className="hidden sm:block">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
