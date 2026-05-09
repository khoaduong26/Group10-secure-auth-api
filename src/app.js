const express = require("express");
const app = express();
const authRoutes =
require("./routes/authRoutes");

app.use("/api", authRoutes);
app.use(express.json());

module.exports = app;