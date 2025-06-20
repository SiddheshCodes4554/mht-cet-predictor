import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function ResultTable({ results }) {
  const [showAll, setShowAll] = useState({
    round1: false,
    round2: false,
    round3: false,
  });

  const [topOnly, setTopOnly] = useState(false);

  const toggleShowAll = (round) => {
    setShowAll((prev) => ({ ...prev, [round]: !prev[round] }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("MHT CET College Predictor Results", 14, 15);

    const tableData = [];

    Object.keys(results).forEach((round) => {
      const entries = results[round] || [];
      const isShowAll = showAll[round];
      const visible = topOnly
        ? entries.slice(0, 3)
        : isShowAll
        ? entries
        : entries.slice(0, 15);

      visible.forEach((entry) => {
        tableData.push([
          round.toUpperCase(),
          entry.college,
          entry.city,
          entry.branch,
          entry.coreCategory,
          entry.cutoff,
          entry.chance.replace("✅", "").replace("⚠️", "").replace("❌", ""),
        ]);
      });
    });

    autoTable(doc, {
      head: [["Round", "College", "City", "Branch", "Category", "Cutoff", "Chance"]],
      body: tableData,
      startY: 25,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [37, 99, 235] },
      theme: "grid",
    });

    doc.save("College_Predictor_Results.pdf");
  };

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.95rem", marginRight: "1rem" }}>
          <input
            type="checkbox"
            checked={topOnly}
            onChange={() => setTopOnly(!topOnly)}
            style={{ marginRight: "8px" }}
          />
          Show only top 3 colleges per round
        </label>
        <button onClick={handleDownloadPDF} style={{ marginLeft: "1rem" }}>
          ⬇️ Download PDF
        </button>
      </div>

      {["round1", "round2", "round3"].map((round) => {
        const entries = results[round] || [];
        const isShowAll = showAll[round];
        const visibleEntries = topOnly
          ? entries.slice(0, 3)
          : isShowAll
          ? entries
          : entries.slice(0, 15);

        return (
          <div key={round}>
            <h3 className="center">{round.toUpperCase()} Results</h3>

            {visibleEntries.length > 0 ? (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>College</th>
                      <th>City</th>
                      <th>Branch</th>
                      <th>Category</th>
                      <th>Cutoff</th>
                      <th>Chance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleEntries.map((entry, idx) => (
                      <tr key={idx}>
                      <td data-label="College">
                        {entry.college}
                        {idx === 0 && <span className="badge gold">🥇 Top 1</span>}
                        {idx === 1 && <span className="badge silver">🥈 Top 2</span>}
                        {idx === 2 && <span className="badge bronze">🥉 Top 3</span>}
                      </td>
                      <td data-label="City">{entry.city}</td>
                      <td data-label="Branch">{entry.branch}</td>
                      <td data-label="Category">{entry.coreCategory}</td>
                      <td data-label="Cutoff">{entry.cutoff}</td>
                      <td data-label="Chance">{entry.chance}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>

                {!topOnly && entries.length > 15 && (
                  <div style={{ textAlign: "center", margin: "1rem 0" }}>
                    <button onClick={() => toggleShowAll(round)}>
                      {isShowAll ? "Show Less" : "View All"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="center">No matches found in {round}.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
