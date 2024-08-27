import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import Dota2Page from "./pages/Dota2Page";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/dota2" element={<Dota2Page />} />
      </Routes>
    </Router>
  );
};

export default App;
