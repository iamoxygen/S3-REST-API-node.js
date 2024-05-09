const { Schema, model } = require("mongoose");

const User = new Schema({
  name: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase:true
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
});

module.exports = model("user", User);
