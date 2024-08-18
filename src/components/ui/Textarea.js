// src/components/ui/Textarea.js
import React from "react";
import "./App.css";
import "./index.css";
const Textarea = ({ id, value, onChange }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      className="p-2 border rounded shadow-md mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
  );
};

export { Textarea };
