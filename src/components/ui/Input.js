// src/components/ui/Input.js
import React from "react";
import "./App.css";
import "./index.css";
const Input = ({ id, type = "text", value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="sm:px-6 sm:py-3 md:px-8 md:py-4 mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
  );
};

export { Input };
