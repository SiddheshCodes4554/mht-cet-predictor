// src/pages/Predictor.jsx
import { useState, useEffect } from "react";
import FormSection from "../components/FormSection";
import ResultTable from "../components/ResultTable";
import { predictColleges } from "../utils/predictLogic";

export default function Predictor() {
  const [formData, setFormData] = useState({
    percentile: "",
    category: "OPEN",
    branch: "",
    city: "",
  });

  const [rounds, setRounds] = useState({ round1: [], round2: [], round3: [] });
  const [results, setResults] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [r1, r2, r3] = await Promise.all([
        fetch("/data/round1.json").then(res => res.json()),
        fetch("/data/round2.json").then(res => res.json()),
        fetch("/data/round3.json").then(res => res.json()),
      ]);
      setRounds({ round1: r1, round2: r2, round3: r3 });
    }
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(formData.percentile);
    if (isNaN(parsed)) return;
    const filtered = predictColleges({ ...formData, percentile: parsed }, rounds);
    setResults(filtered);
  };


  
  return (
    <main>
      <h2 className="center">College Predictor</h2>
      <FormSection formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
      {results && <ResultTable results={results} />}
    </main>
  );
}
