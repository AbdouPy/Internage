import React, { useEffect, useState } from "react";
import { getAllPrograms, deleteProgram } from "../api/services/ProgramService";

const ProgramList = ({ onEdit }) => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const response = await getAllPrograms();
            setPrograms(response.data);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this program?")) return;

        try {
            await deleteProgram(id);
            setPrograms(programs.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error deleting program:", error);
            alert("Failed to delete program.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-[#002D62] mb-4">Program List</h2>

            <table className="w-full table-auto border">
                <thead>
                    <tr className="bg-[#002D62] text-white">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map((program) => (
                        <tr key={program.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{program.name}</td>
                            <td className="p-2 space-x-2 text-center">
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(program)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(program.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
};

export default ProgramList;
