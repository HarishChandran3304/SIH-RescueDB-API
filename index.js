const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started on port ${PORT}`);
});
