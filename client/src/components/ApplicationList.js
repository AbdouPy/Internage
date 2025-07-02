import React, { useEffect, useState } from "react";
import { getAllApplications, updateStatus } from "../api/services/ApplicationService";

const ApplicationList = () => {
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [applications, setApplications] = useState([]);
    const [selectedIntern, setSelectedIntern] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await getAllApplications();
            console.log("All applications fetched:", response.data);
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const handleStatusChange = async (internId,programId, newStatus) => {
        try {
            await updateStatus(internId,programId, newStatus);
            setMessage("✅ Status updated successfully.");
            setIsError(false);
            fetchApplications();
        } catch (error) {
            console.error("Error updating status:", error);
            setMessage("❌ Failed to update status.");
            setIsError(true);
        }
    };

    const openDetails = (app) => {
        setSelectedIntern(app);
    };

    const closeDetails = () => {
        setSelectedIntern(null);
    };

    const matchingApps = selectedIntern
        ? applications.filter(
            (a) =>
                a.name === selectedIntern.name &&
                a.birthDate === selectedIntern.birthDate
        )
        : [];

    

    return (
        <div className="max-w-6xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-[#002D62] mb-4">Submitted Applications</h2>

            {message && (
                <div className={`mb-4 text-center text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
                    {message}
                </div>
            )}

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#002D62] text-white">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Gender</th>
                        <th className="p-2 text-left">Departments</th>
                        <th className="p-2 text-left">Institution</th>
                        <th className="p-2 text-left">Field</th>
                        <th className="p-2 text-left">Phone</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Applied Times</th>
                        <th className="p-2 text-left">CV</th>
                        <th className="p-2 text-left">Motivation Letter</th>
                        <th className="p-2 text-left">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.intern_id} className="border-b hover:bg-gray-100">
                            <td className="p-2">{app.name}</td>
                            <td className="p-2">{app.gender}</td>
                            <td className="p-2">
                                {Array.isArray(app.sessions) && app.sessions.length > 0
                                    ? app.sessions[app.sessions.length - 1].programs.join(", ")
                                    : "N/A"}
                            </td>

                            <td className="p-2">{app.university}</td>
                            <td className="p-2">{app.field_of_study}</td>
                            <td className="p-2">{app.phone}</td>
                            <td className="p-2">{app.email}</td>
                            <td className="p-2">
                                <select
                                    value={app.status}
                                    onChange={(e) => handleStatusChange(app.intern_id,app.program_id, e.target.value)}
                                    className="border p-1 rounded text-sm"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>
                            <td className="p-2">{app.totalApplications}</td>
                            <td className="p-2">
                                {app.cv && (
                                    <a
                                        href={`http://localhost:3001/uploads/${app.cv}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View CV
                                    </a>
                                )}
                            </td>
                            <td className="p-2">
                                {app.motivation_letter && (
                                    <a
                                        href={`http://localhost:3001/uploads/${app.motivation_letter}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View Letter
                                    </a>
                                )}
                            </td>
                            <td className="p-2">
                                <button
                                    className="text-blue-500 underline"
                                    onClick={() => openDetails(app)}
                                >
                                    More details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedIntern && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white max-w-3xl w-full p-6 rounded shadow-lg relative overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={closeDetails}
                            className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-semibold mb-4">
                            All Applications by -- {selectedIntern.name}
                        </h3>

                        <table className="w-full text-sm border">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2">Department(s)</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Submitted</th>
                                    <th className="p-2">CV</th>
                                    <th className="p-2">Letter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchingApps.map((app, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">
                                            {Array.isArray(app.sessions) && app.sessions.length > 0
                                                ? app.sessions[app.sessions.length - 1].programs.join(", ")
                                                : "N/A"}
                                        </td>

                                        <td className="p-2 capitalize">{app.status}</td>
                                        <td className="p-2">{app.createdAt?.split("T")[0]}</td>
                                        <td className="p-2">
                                            {app.cv ? (
                                                <a
                                                    href={`http://localhost:3001/uploads/${app.cv}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    View CV
                                                </a>
                                            ) : "N/A"}
                                        </td>
                                        <td className="p-2">
                                            {app.motivation_letter ? (
                                                <a
                                                    href={`http://localhost:3001/uploads/${app.motivation_letter}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    View Letter
                                                </a>
                                            ) : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationList;
