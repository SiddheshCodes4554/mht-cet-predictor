// src/components/HeroSection.jsx
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">MHT CET College Predictor</h1>
        <p className="hero-subtitle">
          Instantly discover which engineering colleges you can get into based on your percentile,
          category, and preferences. No login. No hassle.
        </p>
        <button className="hero-button" onClick={() => navigate("/predictor")}>
          🎯 Predict My College
        </button>
      </div>
    </section>
  );
}
