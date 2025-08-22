import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaUsers, FaBuilding, FaUserCheck } from "react-icons/fa";

const Stats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/users");
      return res.data.users;
    },
  });

  if (isLoading) return <p>Loading stats...</p>;
  if (isError) return <p>Error fetching stats</p>;

  const totalUsers = data.length;
  const activeUsers = data.filter(user => user.age < 35).length; 
  const companies = new Set(data.map(user => user.company?.name)).size;

  const stats = [
    { title: "Total Users", value: totalUsers, icon: <FaUsers className="text-white text-2xl" />, bg: "bg-indigo-500" },
    { title: "Active Users", value: activeUsers, icon: <FaUserCheck className="text-white text-2xl" />, bg: "bg-green-500" },
    { title: "Companies", value: companies, icon: <FaBuilding className="text-white text-2xl" />, bg: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div key={idx} className={`flex items-center p-6 rounded-xl ${stat.bg} shadow-lg`}>
          <div className="mr-4">{stat.icon}</div>
          <div>
            <p className="text-white text-xl font-bold">{stat.value}</p>
            <p className="text-white text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
