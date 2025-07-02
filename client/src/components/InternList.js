import React, { useEffect, useState } from "react";
import { getAllInterns, deleteIntern } from "../api/services/InternService";

export default function InternList({ refresh, onEdit }) {
  const [interns, setInterns] = useState([]);

  // Charger la liste
  useEffect(() => {
    const fetchInterns = async () => {
      const response = await getAllInterns();
      setInterns(response.data);
    };
    fetchInterns();
  }, [refresh]);

  // 👉 Fonction pour supprimer un intern
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this intern?")) {
      try {
        await deleteIntern(id);
        setInterns((prev) => prev.filter((intern) => intern.id !== id)); 
      } catch (error) {
        console.error("Error deleting intern:", error);
        alert("Failed to delete intern.");
      }
    }
  };

  // 👉 Fonction pour modifier
  const handleEdit = (intern) => {
    if (onEdit) onEdit(intern);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4 text-[#002D62]">Interns List</h2>
      <table className="w-full border">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">Last Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">University</th>
            <th className="py-2 px-4 border">Field</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern, index) => (
            <tr key={intern.id} className="text-center hover:bg-gray-50">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{intern.first_name}</td>
              <td className="py-2 px-4 border">{intern.last_name}</td>
              <td className="py-2 px-4 border">{intern.email}</td>
              <td className="py-2 px-4 border">{intern.university}</td>
              <td className="py-2 px-4 border">{intern.field_of_study}</td>
              <td className="py-2 px-4 border space-x-2">
                
                <button
                  onClick={() => handleEdit(intern)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(intern.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
