const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

// allow ngrok to work through cors
const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/agencies", require("./routes/agencyRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
