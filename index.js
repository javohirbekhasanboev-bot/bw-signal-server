const express = require("express");
const path = require("path");

const app = express();

// JSON
app.use(express.json());

// STATIC papka
app.use(express.static("public"));

// ROOT (asosiy sahifa)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// TEST (tekshirish uchun)
app.get("/test", (req, res) => {
  res.send("TEST ISHLAYAPTI ✅");
});

// API
app.post("/check", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ success: false });
  }

  const deposit = Math.floor(Math.random() * 90) + 10;
  const signal = Math.floor(Math.random() * 5) + 1;

  res.json({ success: true, deposit, signal });
});

// PORT (Render uchun)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});
