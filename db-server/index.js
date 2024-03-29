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
// app.use(cors());

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


// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5003;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// mongoose.connect('mongodb://0.0.0.0/movieheist', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('MongoDB connection error:', error);
// });

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const newUser = new User({
//       email,
//       password,
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User signed up successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
