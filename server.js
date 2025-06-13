const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/api/flight-price", async (req, res) => {
  const { origin, destination, date } = req.query;

  const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${origin}&destination=${destination}&departure_date=${date}&currency=INR&token=${process.env.TP_TOKEN}`;

  console.log("➡️ Fetching URL:", url);
  console.log("🔐 API Token:", process.env.TP_TOKEN);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching flight price:", err);
    res.status(500).json({ error: "Failed to fetch flight price" });
  }
});

// ✅ Bind to 0.0.0.0 for Koyeb
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
