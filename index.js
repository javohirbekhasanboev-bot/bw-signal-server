const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// 🔥 vaqtinchalik database
let users = {};

// 🔥 TEST (tekshirish uchun)
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// 🔥 POSTBACK (casino dan keladi)
app.get("/postback", (req, res) => {
  const id = req.query.id;
  const amount = parseFloat(req.query.amount || 0);

  if (!id) {
    return res.send("NO ID");
  }

  if (!users[id]) {
    users[id] = {
      deposit: 0,
      signal: 0
    };
  }

  users[id].deposit += amount;
  users[id].signal = Math.floor(Math.random() * 5) + 1;

  console.log("POSTBACK:", id, users[id]);

  res.send("OK");
});

// 🔥 STATIC HTML (frontend)
app.use(express.static(path.join(__dirname, "public")));

// 🔥 HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔥 USER CHECK API
app.post("/check", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      success: false,
      message: "ID kiritilmadi"
    });
  }

  const user = users[id] || { deposit: 0, signal: 0 };

  res.json({
    success: true,
    deposit: user.deposit,
    signal: user.signal
  });
});

// 🔥 PORT (Render uchun muhim)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});
