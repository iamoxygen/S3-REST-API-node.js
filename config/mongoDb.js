const mongoose = require("mongoose");

const uri = process.env.DATABASE;

(async function createDbConnection() {
  try {
    await mongoose.connect(uri);
    console.log(`**Database Connected**`);
  } catch (err) {
    console.log("Error from Database", err);
  }
})();

module.exports = mongoose;
