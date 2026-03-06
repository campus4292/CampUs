const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
{
  title: String,
  type: String,
  description: String,

  status: {
    type: String,
    default: "Open",
  },

  ownerUsername: String,

  acceptedBy: {
    type: String,
    default: null
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);