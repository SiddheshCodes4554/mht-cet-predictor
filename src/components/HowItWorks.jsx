// src/components/HowItWorks.jsx
export default function HowItWorks() {
    const steps = [
      "Enter your CET percentile, category, and optional branch/city.",
      "We'll analyze all 3 rounds of data instantly.",
      "See a table of colleges you’re likely to get — sorted by chances!",
    ];
  
    return (
      <section className="how-it-works-section">
        <h2 className="section-title">How It Works</h2>
        <ol className="how-steps">
          {steps.map((step, i) => (
            <li key={i}>
              <span>{i + 1}</span> {step}
            </li>
          ))}
        </ol>
      </section>
    );
  }
  