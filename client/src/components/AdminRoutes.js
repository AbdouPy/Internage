// src/components/AdminRoutes.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProgramPanel from "./ProgramPanel";
import InternsPanel from "./InternsPanel";
import InternList from "./InternList";
import ApplicationForm from "./ApplicationForm";
import ApplicationList from "./ApplicationList";
import AssignmentForm from "./AssignmentForm";

const isApplicationOpen = () => {
  const allowedMonths = [0, 3, 6, 9]; // Jan, Apr, Jul, Oct
  const currentMonth = new Date().getMonth();
  return allowedMonths.includes(currentMonth);
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboards" element={<Dashboard />} />
      <Route path="/programs/panel" element={<ProgramPanel />} />
      <Route path="/interns/panel" element={<InternsPanel />} />
      <Route path="/interns_lists" element={<InternList />} />
      <Route
        path="/applications"
        element={
          isApplicationOpen() ? (
            <ApplicationForm />
          ) : (
            <div className="mt-12 max-w-xl mx-auto bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M1 12c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"
                />
              </svg>
              <p className="text-lg font-medium">
                ❌ Les candidatures sont actuellement fermées. Veuillez revenir en <strong>janvier</strong>, <strong>avril</strong>, <strong>juillet</strong> ou <strong>octobre</strong>.
              </p>
            </div>
          )
        }
      />
      <Route path="/applicationsList" element={<ApplicationList />} />
      <Route path="/assignments" element={<AssignmentForm />} />
    </Routes>
  );
};

export default AdminRoutes;
