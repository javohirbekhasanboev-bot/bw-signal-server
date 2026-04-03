const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/check", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      success: false,
      message: "ID kerak"
    });
  }

  // demo uchun random depozit
  const deposit = Math.floor(Math.random() * 20);

  if (deposit < 5) {
    return res.json({
      success: false,
      message: "Depozit 5$ dan kam"
    });
  }

  const signal = Math.floor(Math.random() * 5) + 1;

  res.json({
    success: true,
    deposit: deposit,
    signal: signal
  });
});

app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});
app.get("/", (req, res) => {
  res.send("Server ishlayapti 🚀");
});
