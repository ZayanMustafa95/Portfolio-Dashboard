import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center rounded-b-xl">
      <div>
        <h2 className="text-lg text-gray-500">Welcome back,</h2>
        <h1 className="text-3xl font-bold text-indigo-900 mt-1">
          {user?.username ? user.username : "Guest"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500 hidden sm:block">Hi, {user?.firstName || "User"}</div>
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-indigo-500">
          <img
            src={user?.avatar || "https://i.pravatar.cc/40"}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
