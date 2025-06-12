const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const PORT = 5000;

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

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
