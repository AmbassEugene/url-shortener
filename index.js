require("dotenv").config("/.env");
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

app.use(express.json({ extended: false }));

// define routes

app.use("/", require("./routes"));
app.use("/api/url", require("./routes/url"));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
