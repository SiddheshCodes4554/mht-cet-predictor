// utils/rankCollegesAI.js
import axios from "axios";

export async function rankCollegesWithOpenAI(collegeList) {
  const prompt = `
Rank the following colleges in Maharashtra for B.Tech based on overall reputation, placement, academics, and facilities. Return a JSON object where each college name is a key and its rank is a number (1 = highest).

Colleges:
${collegeList.map((c, i) => `${i + 1}. ${c}`).join("\\n")}
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4
      },
      {
        headers: {
          Authorization: `Bearersk-abcdef1234567890abcdef1234567890abcdef12`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content;

    // Try parsing JSON from response
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}") + 1;
    const json = JSON.parse(content.slice(jsonStart, jsonEnd));
    return json;

  } catch (err) {
    console.error("OpenAI ranking failed:", err);
    return {};
  }
}
