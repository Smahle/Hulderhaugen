import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { initializeDB } from './meal-planner/data/MealPlannerDatabase.ts';

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Initialize the database and then render the application
initializeDB().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Failed to initialize the database:', error);
});
