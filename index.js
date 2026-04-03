const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// 🔥 vaqtinchalik database (keyin DB qilamiz)
let users = {};

// static html
app.use(express.static(path.join(__dirname, "public")));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔥 POSTBACK (REAL DATA KELADI)
app.get("/postback", (req, res) => {
  const id = req.query.id;
  const amount = req.query.amount || 0;

  if (!id) return res.send("No ID");

  if (!users[id]) {
    users[id] = {
      deposit: 0,
      signal: 0
    };
  }

  users[id].deposit += parseFloat(amount);
  users[id].signal = Math.floor(Math.random() * 5) + 1;

  console.log("NEW DATA:", id, users[id]);

  res.send("OK");
});

// 🔥 USER TEKSHIRISH
app.post("/check", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      success: false,
      message: "ID kiritilmadi"
    });
  }

  if (!users[id]) {
    return res.json({
      success: true,
      deposit: 0,
      signal: 0
    });
  }

  res.json({
    success: true,
    deposit: users[id].deposit,
    signal: users[id].signal
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});
