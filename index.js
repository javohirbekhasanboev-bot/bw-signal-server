const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// public papkani ulash
app.use(express.static(path.join(__dirname, "public")));

// 🔥 MUHIM: root = index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API
app.post("/check", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ success: false, message: "ID yo‘q" });
  }

  const deposit = Math.floor(Math.random() * 90) + 10;
  const signal = Math.floor(Math.random() * 5) + 1;

  res.json({ success: true, deposit, signal });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});
