import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

export default function OfficerDashboard() {
  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <div className="w-[80px] sm:w-[320px] py-8 px-0 sm:px-4 border-r border-gray-200 fixed">
        <Sidebar />
      </div>

      {/* content */}
      <div className="flex-1 py-8 px-0 sm:px-4 ml-[80px] sm:ml-[320px]">
        <Content />
      </div>
    </div>
  );
}
