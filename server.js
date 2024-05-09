require("dotenv").config()
const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;
const fs = require("fs");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');


// database
require("./config/mongoDb");



//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

fs.readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

app.listen(PORT, (err) => {
  if (err) return;
  console.log(`Server is listen on port: ${PORT}`);
});
