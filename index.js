const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// static html (public papka)
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

// API (ID tekshiradi, depozit va signal qaytaradi)
app.post("/check", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      success: false,
      message: "ID kiriting"
    });
  }

  // FAKE depozit (random)
  const deposit = Math.floor(Math.random() * 50) + 1;

  if (deposit < 5) {
    return res.json({
      success: false,
      message: "Depozit 5$ dan kam"
    });
  }

  // signal (1-5)
  const signal = Math.floor(Math.random() * 5) + 1;

  res.json({
    success: true,
    deposit: deposit,
    signal: signal
  });
});

// HTML ochish
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// server start
app.listen(PORT, () => {
  console.log("Server ishga tushdi 🚀");
});
