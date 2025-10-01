// src/App.js
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [badgeGood, setBadgeGood] = useState("");
  const [badgeBad, setBadgeBad] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reviews"), {
        businessID: "SALON123",   // hardcoded for now
        serviceID: service,
        email,
        badgeGood,
        badgeBad,
        timestamp: serverTimestamp()
      });
      alert("✅ Thank you! Your review has been submitted.");
      setService(""); setEmail(""); setBadgeGood(""); setBadgeBad("");
    } catch (err) {
      console.error("❌ Error saving review:", err);
      alert("Error — check console.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>Service</label>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          <option value="">Select Service</option>
          <option value="HAIRCUT">Haircut</option>
          <option value="OIL_CHANGE">Oil Change</option>
        </select><br/><br/>

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/><br/>

        <label>Good Badge</label>
        <select value={badgeGood} onChange={(e) => setBadgeGood(e.target.value)} required>
          <option value="">Select</option>
          <option value="Professional">Professional</option>
          <option value="Helpful">Helpful</option>
        </select><br/><br/>

        <label>Bad Badge (Optional)</label>
        <select value={badgeBad} onChange={(e) => setBadgeBad(e.target.value)}>
          <option value="">None</option>
          <option value="Rushed">Rushed</option>
          <option value="Unclear">Unclear</option>
        </select><br/><br/>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default App;
