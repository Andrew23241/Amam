"use client";
import React, { useState, ReactNode } from "react";

interface HideProps {
  buttonName: string;
  children: ReactNode;
}

function Hide({ buttonName, children }: HideProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility function
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* Button to toggle visibility */}
      <button
        onClick={toggleVisibility}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isVisible ? `Hide ${buttonName}` : `Show ${buttonName}`}
      </button>

      {/* Conditionally render children */}
      {isVisible && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default Hide;
