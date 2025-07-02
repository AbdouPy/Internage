import React from "react";
import { Link, useLocation } from "react-router-dom";



function SidebarLink({ to,icon: Icon, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block px-4 py-3 rounded-md font-medium transition-shadow text-[#002D62]${isActive
          ? " text-[#002D62]"
          : " hover:bg-[#002D62] hover:text-white hover:shadow-lg"
        }`}
    >
      {children}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#ffffff] min-h-screen p-6 flex flex-col">
      {/* Logo (dans public) */}
      <div className="flex items-center mb-8 rounded">
        <img src="/radisson-logo.png" alt="logo" className="h-20 w-full mr-2" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
        <SidebarLink to="/dashboards">🏠 Dashboard</SidebarLink>
        <SidebarLink to="/interns/panel">Manage Interns</SidebarLink>
        <SidebarLink to="/applications ">Applications</SidebarLink>
        <SidebarLink to="/applicationsList ">Applications Submitted</SidebarLink>
        <SidebarLink to="/assignments">Assignments</SidebarLink>
        <SidebarLink to="/programs/panel">Programs</SidebarLink>
      </nav>

      {/* Séparation avant footer */}
      <div className="border-t border-gray-500 mt-6 pt-6" />

      {/* Footer */}
      <div className="mt-auto text-gray-400 text-xs text-center">
        &copy; 2025 Radisson Hotel Niamey
      </div>
    </aside>
  );
}