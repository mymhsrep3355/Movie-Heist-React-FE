const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config(); //env setup
const app = express();
const port = process.env.PORT || 7000;
const { MONGODB_URL } = process.env;

//middlewares

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
}));

app.use("/api/auth", authRoute);
mongoose.connect(MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get("/", (req, res) => {
  res.send("Welcome to Movie Heist Server!");
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connection successful!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


