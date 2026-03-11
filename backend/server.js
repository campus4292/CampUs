
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./models/User");
const Request = require("./models/Request");
const { verifyToken, checkRole } = require("./middleware/auth");

const dns = require("dns");
dns.setServers(["8.8.8.8", "4.4.4.4"]);

const app = express();

/* ================= CORS ================= */

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://campus4.netlify.app",
    "https://camp-ngv8u0c72-camp-us.vercel.app/"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

app.use(express.json());

/* ================= DATABASE ================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.error("❌ MongoDB Connection Error:");
  console.error(err);
  process.exit(1);
});

/* ================= AUTH ROUTES ================= */

app.post("/auth/register", async (req, res) => {

  const { name, email, username, password } = req.body;

  try {

    const existing = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existing) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      username,
      password,
      role: "student",
      coins: 100
    });

    res.json({
      message: "Registered successfully",
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ===== LOGIN ===== */

app.post("/auth/login", async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await User.findOne({
      $or: [
        { username },
        { email: username }
      ]
    });

    if (!user)
      return res.status(404).json({
        message: "User not found"
      });

    if (user.password !== password)
      return res.status(401).json({
        message: "Invalid password"
      });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
        coins: user.coins
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ================= EXCHANGE ROUTES ================= */

app.post("/exchange/create", verifyToken, async (req, res) => {

  try {

    const { title, type, description } = req.body;

    const newRequest = await Request.create({
      title,
      type,
      description,
      ownerUsername: req.user.username,
      ownerRole: req.user.role,
      status: "Open",
      acceptedBy: null
    });

    res.json(newRequest);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ===== GET ALL ===== */

app.get("/exchange/all", async (req, res) => {

  try {

    const requests = await Request.find()
      .sort({ createdAt: -1 });

    res.json(requests);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ===== ACCEPT ===== */

app.put("/exchange/accept/:id", verifyToken, async (req, res) => {

  try {

    const request = await Request.findById(req.params.id);

    if (!request)
      return res.status(404).json({
        message: "Request not found"
      });

    if (request.ownerUsername === req.user.username)
      return res.status(400).json({
        message: "Cannot accept your own request"
      });

    request.status = "Accepted";
    request.acceptedBy = req.user.username;

    await request.save();

    res.json(request);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ===== DELETE ===== */

app.delete("/exchange/:id", verifyToken, async (req, res) => {

  try {

    const request = await Request.findById(req.params.id);

    if (!request)
      return res.status(404).json({
        message: "Request not found"
      });

    if (request.ownerUsername !== req.user.username)
      return res.status(403).json({
        message: "Not allowed"
      });

    await Request.findByIdAndDelete(req.params.id);

    res.json({
      message: "Request deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ===== MY REQUESTS ===== */

app.get("/exchange/my-requests", verifyToken, async (req, res) => {

  try {

    const requests = await Request.find({
      ownerUsername: req.user.username
    });

    res.json(requests);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});

/* ================= ADMIN ROUTES ================= */

app.get(
  "/admin/users",
  verifyToken,
  checkRole(["admin"]),
  async (req, res) => {

    try {

      const users = await User.find();

      res.json(users);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Server error"
      });

    }

  }
);

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {

  res.send({
    activeStatus: true,
    error: false
  });

});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});