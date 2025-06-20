// src/components/FormSection.jsx
export default function FormSection({ formData, setFormData, onSubmit }) {
  const coreCategories = [
    "OPEN", "EWS", "OBC", "SEBC", "SC", "ST",
    "NT1", "NT2", "NT3", "DEFENCE", "PWD", "ORPHAN"
  ];

  // ✅ ADD THIS HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Percentile</label>
      <input
        type="number"
        step="0.01"
        required
        max="100"
        min="0"
        name="percentile"
        value={formData.percentile}
        onChange={handleChange}
      />

      <label>Category</label>
      <select
        name="category"
        value={formData.category || "OPEN"}
        onChange={handleChange}
      >
        {coreCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <label>Gender</label>
      <select
        name="gender"
        value={formData.gender || "Gender Neutral"}
        onChange={handleChange}
        required
      >
        <option value="Gender Neutral">Gender Neutral</option>
        <option value="Female">Female</option>
      </select>

      <label>Preferred Branch</label>
      <input
        type="text"
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        placeholder="Optional"
      />

      <label>Preferred City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Optional"
      />

      <button type="submit">Predict Colleges</button>
    </form>
  );
}
