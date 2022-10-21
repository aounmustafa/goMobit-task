const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cell: { type: String, required: true },
  age: { type: String, required: true },
  created: { type: String, required: true },
  deleted: { type: Boolean },
});

module.exports = mongoose.model("user", userSchema);
