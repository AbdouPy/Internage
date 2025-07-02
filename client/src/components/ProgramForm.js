import React, { useState } from "react";
import { createProgram } from "../api/services/ProgramService";

const ProgramForm = () => {
  const [FormData, setProgram] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setProgram({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProgram(FormData);
      alert("Program created successfully!");
    } catch (error) {
      console.error("Error creating program:", error);
      alert("Error creating program");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-4 text-center text-[#002D62]">Create a Program</h2>

      {/* Program Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Department Name"
          value={FormData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#002D62] text-white p-3 rounded-md font-semibold hover:bg-blue-800 transition"
      >
        Save Department
      </button>
    </form>

  );
};

export default ProgramForm;
