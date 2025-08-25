import { FaHome, FaCog } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/dashboard" },
    { name: "Settings", icon: <FaCog />, path: "/dashboard/settings" },
    { name: "Blogs", icon: <FaBloggerB />, path: "/dashboard/blog" },
    {
      name: "Ecommernece",
      icon: <MdOutlineProductionQuantityLimits />,
      path: "/dashboard/e-products",
    },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-indigo-800 via-indigo-900 to-black text-white h-screen flex flex-col justify-between shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-indigo-800 font-bold text-xl">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-lg">{user?.name || "User Name"}</p>
            <p className="text-sm text-gray-300">
              {user?.email || "email@example.com"}
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:translate-x-1"
            >
              <div className="text-xl">{item.icon}</div>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl bg-red-500 hover:bg-red-600 transition-all duration-300 font-semibold justify-center shadow-md"
        >
          <CiLogout className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
