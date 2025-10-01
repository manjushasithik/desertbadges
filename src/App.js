import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { Button, TextField, MenuItem, Typography, Box } from "@mui/material";

function App() {
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [badgeGood, setBadgeGood] = useState("");
  const [badgeBad, setBadgeBad] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "reviews"), {
      businessID: "SALON123",
      serviceID: service,
      email,
      badgeGood,
      badgeBad,
      timestamp: serverTimestamp(),
    });
    alert("Review submitted! Thank you.");
    

  };

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Rate This Business
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Service"
          select
          fullWidth
          margin="normal"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <MenuItem value="HAIRCUT">Haircut</MenuItem>
          <MenuItem value="OIL_CHANGE">Oil Change</MenuItem>
        </TextField>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Good Badge"
          select
          fullWidth
          margin="normal"
          value={badgeGood}
          onChange={(e) => setBadgeGood(e.target.value)}
          required
        >
          <MenuItem value="Professional">Professional</MenuItem>
          <MenuItem value="Helpful">Helpful</MenuItem>
        </TextField>

        <TextField
          label="Bad Badge (optional)"
          select
          fullWidth
          margin="normal"
          value={badgeBad}
          onChange={(e) => setBadgeBad(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Rushed">Rushed</MenuItem>
          <MenuItem value="Unclear">Unclear</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Submit Review
        </Button>
      </form>
    </Box>
  );
}

export default App;
