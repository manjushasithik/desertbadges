import { useState, useEffect } from "react";
import { collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [services, setServices] = useState([]);
  const [service, setService] = useState("");
  const [email, setEmail] = useState("");
  const [badgeGood, setBadgeGood] = useState("");
  const [badgeBad, setBadgeBad] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [lockBusiness, setLockBusiness] = useState(false);

  // Load businesses
  useEffect(() => {
    const fetchBusinesses = async () => {
      const querySnapshot = await getDocs(collection(db, "businesses"));
      const bizList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBusinesses(bizList);

      // Check if URL has ?biz=ID
      const params = new URLSearchParams(window.location.search);
      const preselect = params.get("biz");
      if (preselect) {
        setSelectedBusiness(preselect);
        setLockBusiness(true);
      }
    };
    fetchBusinesses();
  }, []);

  // Load services for selected business
  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedBusiness) {
        setServices([]);
        return;
      }
      const q = query(
        collection(db, "services"),
        where("businessID", "==", selectedBusiness)
      );
      const querySnapshot = await getDocs(q);
      const serviceList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(serviceList);
    };
    fetchServices();
  }, [selectedBusiness]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const biz = businesses.find((b) => b.businessID === selectedBusiness);

    await addDoc(collection(db, "reviews"), {
      businessID: biz.businessID,
      businessName: biz.name,
      serviceID: service,
      email,
      badgeGood,
      badgeBad,
      timestamp: serverTimestamp(),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box sx={{ p: 4, maxWidth: 500, mx: "auto", textAlign: "center" }}>
        <Typography variant="h5" color="success.main">
          🎉 Thanks for your feedback!
        </Typography>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => setSubmitted(false)}
        >
          Submit Another
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Leave a Review
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Business Dropdown */}
          <TextField
            select
            fullWidth
            label="Business"
            value={selectedBusiness}
            onChange={(e) => setSelectedBusiness(e.target.value)}
            margin="normal"
            required
            disabled={lockBusiness}  // ✅ disable if QR preselected
          >
            {businesses.map((biz) => (
              <MenuItem key={biz.businessID} value={biz.businessID}>
                {biz.name} ({biz.type})
              </MenuItem>
            ))}
          </TextField>

          {/* Service Dropdown */}
          <TextField
            select
            fullWidth
            label="Service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            margin="normal"
            required
            disabled={services.length === 0}
          >
            {services.map((srv) => (
              <MenuItem key={srv.id} value={srv.name}>
                {srv.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Email */}
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          {/* Good Badge */}
          <TextField
            select
            fullWidth
            label="Good Badge"
            value={badgeGood}
            onChange={(e) => setBadgeGood(e.target.value)}
            margin="normal"
            required
          >
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Helpful">Helpful</MenuItem>
          </TextField>

          {/* Bad Badge */}
          <TextField
            select
            fullWidth
            label="Bad Badge (optional)"
            value={badgeBad}
            onChange={(e) => setBadgeBad(e.target.value)}
            margin="normal"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Rushed">Rushed</MenuItem>
            <MenuItem value="Unclear">Unclear</MenuItem>
          </TextField>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, py: 1.2, fontSize: "16px" }}
          >
            Submit Review
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default App;
