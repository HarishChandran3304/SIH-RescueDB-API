const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/agencies", require("./routes/agencyRoutes"));

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
