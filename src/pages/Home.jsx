import React from "react";
import Users from "../components/Users";
import Stats from "../components/Stats";
import AnalyticsChart from "../components/AnalyticsChart";

const Home = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Stats />

      <AnalyticsChart />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <Users />
      </div>
    </div>
  );
};

export default Home;
