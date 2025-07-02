import React, { useState, useEffect } from "react";
import { getAllInterns } from "../api/services/InternService";
import { getAllPrograms } from "../api/services/ProgramService";
import { createAssignment } from "../api/services/AssignmentService";

const AssignmentForm = () => {
  const [formData, setFormData] = useState({
    internId: "",
    programId: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [interns, setInterns] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const res = await getAllInterns();
        setInterns(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPrograms = async () => {
      try {
        const res = await getAllPrograms();
        setPrograms(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterns();
    fetchPrograms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAssignment(formData);
      setMessage("Assignment created successfully!");
      setFormData({
        internId: "",
        programId: "",
        startDate: "",
        endDate: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to create assignment.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Assign Intern</h2>

      {message && <div className="mb-4 text-center text-green-600">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="internId"
          value={formData.internId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Intern</option>
          {interns.map(i => (
            <option key={i.id} value={i.id}>{i.first_name} {i.last_name}</option>
          ))}
        </select>

        <select
          name="programId"
          value={formData.programId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Program</option>
          {programs.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignmentForm;
