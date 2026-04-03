const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// HTML papkani ulash
app.use(express.static(path.join(__dirname, "public")));

// Asosiy sahifa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API (fake depozit + signal)
app.post("/check", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      success: false,
      message: "ID kiritilmadi"
    });
  }

  // random depozit (10 - 100$)
  const deposit = Math.floor(Math.random() * 90) + 10;

  // random signal (1 - 5)
  const signal = Math.floor(Math.random() * 5) + 1;

  res.json({
    success: true,
    id,
    deposit,
    signal
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});
