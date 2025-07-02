import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLogin from "./components/AdminLogin";
import PublicApplicationForm from "./components/PublicAplicationForm";
import AdminRoutes from "./components/AdminRoutes";
import './App.css';

// ✅ Application opening logic
const isApplicationOpen = () => {
  const allowedMonths = [0, 3, 6, 9]; // Jan, Apr, Jul, Oct
  const currentMonth = new Date().getMonth();
  return allowedMonths.includes(currentMonth);
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AdminLogin />} />

        <Route
          path="/apply"
          element={
            isApplicationOpen() ? (
              <PublicApplicationForm />
            ) : (
              <div className="mt-12 max-w-xl mx-auto bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md text-center">
                ❌ Les candidatures sont actuellement fermées.<br />
                Veuillez revenir en <strong>janvier</strong>, <strong>avril</strong>, <strong>juillet</strong> ou <strong>octobre</strong>.
              </div>
            )
          }
        />

        {/* Admin Routes wrapped with Layout */}
        <Route path="/*" element={<Layout><AdminRoutes /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
