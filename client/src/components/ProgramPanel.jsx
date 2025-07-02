// client/src/components/InternsPanel.jsx
import React from "react";
import ProgramForm from "./ProgramForm";
import ProgramList from "./ProgramList";

export default function ProgramPanel() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            {/* Right: Form */}
            <div className="lg:w-1/3 w-full">
                <ProgramForm />
            </div>
            {/* Left: List */}
            <div className="lg:w-2/3 w-full">
                <ProgramList />
            </div>


        </div>
    );
}
