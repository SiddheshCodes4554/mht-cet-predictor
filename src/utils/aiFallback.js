export async function fetchAIPrediction({ college, branch, category, round, year }) {
    try {
      const response = await fetch("http://localhost:5000/api/predict-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ college, branch, category, round, year })
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("AI API error:", error);
      return { error: "AI server unreachable" };
    }
  }
  