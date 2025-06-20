import { useNavigate } from "react-router-dom";
import "../styles/Home.css";


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>MHT CET College Predictor</h1>
          <p>
            Get instant predictions of which colleges you can get into based on your
            percentile, category, and preferences. Backed by official data and AI-powered
            insights.
          </p>
          <button onClick={() => navigate("/predictor")}>🎯 Predict My College</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="card">
              <h3>🎯 Accurate Predictions</h3>
              <p>Get college suggestions based on real MHT CET cutoff data from all rounds.</p>
            </div>
            <div className="card">
              <h3>⚡ Fast & Lightweight</h3>
              <p>No login, no database, instant results based on your input only.</p>
            </div>
            <div className="card">
              <h3>💡 AI-Powered Insights</h3>
              <p>Get smart chance percentages and sorted recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <ol>
            <li><span>1</span> Enter your percentile, category, and optional preferences</li>
            <li><span>2</span> Our AI matches you to past cutoff data across 3 rounds</li>
            <li><span>3</span> You get an interactive table with your admission chances</li>
          </ol>
        </div>
      </section>

      {/* About Project */}
      <section className="about">
        <div className="container">
          <h2>About This Project</h2>
          <p>
            This is a fully client-side college predictor built without any backend or login.
            All logic runs on the frontend using official JSON cutoff data. It's optimized for
            speed, clarity, and mobile-first design.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} MHT CET College Predictor. Built with ❤️ for aspiring engineers.</p>
        </div>
      </footer>
    </div>
  );
}
