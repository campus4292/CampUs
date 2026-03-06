const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: { type: String, required: true },

  username: {
    type: String,
    unique: true,
    required: true
  },

  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["student", "faculty", "admin", "outsider"],
    default: "student",
  },

  coins: { type: Number, default: 100 },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);