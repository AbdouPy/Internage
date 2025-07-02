// client/src/components/InternsPanel.jsx
import React from "react";
import InternForm from "./InternForm";
import InternList from "./InternList";

export default function InternsPanel() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left: List */}
      <div className="lg:w-2/3 w-full">
        <InternList />
      </div>

      {/* Right: Form */}
      <div className="lg:w-1/3 w-full">
        <InternForm />
      </div>
    </div>
  );
}
