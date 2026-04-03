const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// static papka
app.use(express.static("public"));

const PORT = 3000;

// API
app.post("/check", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      success: false,
      message: "ID kiriting"
    });
  }

  const deposit = Math.floor(Math.random() * 50) + 1;

  if (deposit < 5) {
    return res.json({
      success: false,
      message: "Depozit 5$ dan kam"
    });
  }

  const signal = Math.floor(Math.random() * 5) + 1;

  res.json({
    success: true,
    deposit,
    signal
  });
});

// ROOT → HTML qaytaradi
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server ishga tushdi 🚀");
});
