const { Schema, model } = require("mongoose");

const Files = new Schema({
  name: {
    type: String,
    default: "",
    required: true,
  },
  url: {
    type: String,
    default: "",
    required: true,
  },
  key: {
    type: String,
    default: "",
    required: true,
  },
  bucketName: {
    type: String,
    default: "",
    required: true,
  },
});

module.exports = model("files", Files);
