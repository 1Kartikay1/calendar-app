// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "./components/ui/App.css";
import "./components/ui/index.css";
import CalendarApp from "./components/ui/CalendarApp";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>
);
