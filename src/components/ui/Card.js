// src/components/ui/Card.js
import React from "react";
import "./App.css";
import "./index.css";

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const CardHeader = ({ children }) => {
  return <div className="border-b pb-2 mb-4">{children}</div>;
};

const CardTitle = ({ children }) => {
  return <h2 className="text-2xl font-bold mb-2">{children}</h2>;
};

const CardDate = ({ children }) => {
  return <p className="text-lg mb-1">{children}</p>;
};

const CardTime = ({ children }) => {
  return <p className="text-lg mb-1">{children}</p>;
};

const CardDescription = ({ children }) => {
  return <p className="text-lg shadow-md p-4">{children}</p>;
};

export {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDate,
  CardTime,
  CardDescription,
};
