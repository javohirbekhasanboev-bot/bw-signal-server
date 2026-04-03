const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// 🔥 TEMP DATABASE
let users = {};

// 🔥 TEST ROUTE (tekshirish uchun)
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// 🔥 POSTBACK ROUTE (ENG MUHIM)
app.get("/postback", (req, res) => {
  const id = req.query.id;
  const amount = req.query.amount;

  if (!id) {
    return res.send("NO ID");
  }

  if (!users[id]) {
    users[id] = {
      deposit: 0,
      signal: 0
    };
  }

  users[id].deposit += parseFloat(amount || 0);
  users[id].signal = Math.floor(Math.random() * 5) + 1;

  console.log("POSTBACK:", id, users[id]);

  res.send("OK");
});

// 🔥 STATIC HTML
app.use(express.static(path.join(__dirname, "public")));

// 🔥 HOMEPAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔥 CHECK API
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

// 🔥 PORT (Render uchun MUHIM)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server ishlayapti 🚀");
});
