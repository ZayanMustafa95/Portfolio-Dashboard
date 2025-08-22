import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AnalyticsChart = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/users");
      return res.data.users;
    },
  });

  if (isLoading) return <p>Loading chart...</p>;
  if (isError) return <p>Error fetching chart data</p>;

  const ageGroups = [
    { name: "20-29", count: data.filter(u => u.age >= 20 && u.age <= 29).length },
    { name: "30-39", count: data.filter(u => u.age >= 30 && u.age <= 39).length },
    { name: "40-49", count: data.filter(u => u.age >= 40 && u.age <= 49).length },
    { name: "50+", count: data.filter(u => u.age >= 50).length },
  ];

  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">User Age Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={ageGroups}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
