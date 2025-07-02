import React, { useState } from "react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  const secretKey = "admin"; // replace with your real key

  if (password === secretKey) {
    // Allow access: e.g., redirect or set auth flag
    console.log("✅ Access granted");
    window.location.href = "/dashboards";
  } else {
    alert("❌ Incorrect password.");
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-[#002e62fb]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#002D62] mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#002D62]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#002D62] text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
