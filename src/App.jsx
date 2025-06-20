// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Predictor from "./pages/Predictor";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/predictor" element={<Predictor />} />
    </Routes>
  );
}
