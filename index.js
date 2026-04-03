const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// 🔥 vaqtinchalik database
let users = {};

// 🔥 HTML papka
app.use(express.static(path.join(__dirname, "public")));

// 🔥 asosiy sahifa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔥 POSTBACK (kazinodan keladi)
app.get("/postback", (req, res) => {
  const id = req.query.extid;      // user ID
  const amount = req.query.amount; // deposit

  console.log("POSTBACK:", id, amount);

  if (!id) return res.send("No ID");

  if (!users[id]) {
    users[id] = {
      deposit: 0,
      signal: 0
    };
  }

  // 🔥 deposit qo‘shamiz
  users[id].deposit += Number(amount || 0);

  // 🔥 signal random (xohlasang o‘zgartiramiz)
  users[id].signal = Math.floor(Math.random() * 5) + 1;

  res.send("OK");
});

// 🔥 USER CHECK
app.post("/check", (req, res) => {
  const { id } = req.body;

  const user = users[id];

  if (!user) {
    return res.json({
      success: false,
      message: "Topilmadi"
    });
  }

  res.json({
    success: true,
    deposit: user.deposit,
    signal: user.signal
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});
