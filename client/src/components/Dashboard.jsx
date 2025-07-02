import React, { useEffect, useState } from "react";
import { fetchApplicationStats } from "../api/services/ApplicationService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
    total: 0,
  });

  useEffect(() => {
    fetchApplicationStats()
      .then((data) => {
        console.log("Stats received from API:", data); // <-- vérifier ici
        setStats(data);
      })
      .catch((error) => {
        console.error("Failed to fetch stats:", error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-[#002D62]">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <p className="text-xl font-semibold text-blue-700">Pending</p>
          <p className="text-3xl font-bold text-blue-900">{stats.pending}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <p className="text-xl font-semibold text-green-700">Accepted</p>
          <p className="text-3xl font-bold text-green-900">{stats.accepted}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <p className="text-xl font-semibold text-red-700">Rejected</p>
          <p className="text-3xl font-bold text-red-900">{stats.rejected}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg text-center">
          <p className="text-xl font-semibold text-gray-700">Total</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
      </div>
    </div>
  );
}
