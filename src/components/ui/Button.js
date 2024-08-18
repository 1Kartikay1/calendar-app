// src/components/ui/Button.js
import React from "react";
import "./App.css";
import "./index.css";

const Button = ({ variant, onClick, children }) => {
  const baseClasses = "px-4 py-2 rounded border border";
  const responsiveClasses = "lg:px-6 sm:py-3 md:px-8 md:py-4";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-700",
    link: "text-blue-500 underline hover:text-blue-700",
    destructive: "bg-red-500 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`${baseClasses} ${responsiveClasses} ${variantClasses[variant]} shadow-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
