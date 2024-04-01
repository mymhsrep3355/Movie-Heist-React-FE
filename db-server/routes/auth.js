const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User-Model");
const Mailjet = require("node-mailjet");
const {Review}= require('../models/Review-Model')
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
//signup route
router.post("/signup", async (req, res) => {
  const { email, password, preferences } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, preferences });

    // Save the user
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials User Not Found" });
    }
    //checking if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials Password" });
    }
    //creating a token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/forget_password", async (req, res) => {
  try {
    // Generate 5-digit random OTP
    const otp = Math.floor(10000 + Math.random() * 90000);

    // Send OTP via email
    const mailjet = new Mailjet({
      apiKey: "",
      apiSecret: ""
    });

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "arsalanbashir831@gmail.com",
            Name: "Arsalan Bashir"
          },
          To: [
            {
              Email: req.body.email,
              Name: "Recipient Name"
            }
          ],
          Subject: "OTP",
          TextPart: `Your OTP is: ${otp}`,
          HTMLPart: `<h3>Your OTP is: ${otp}</h3>`
        }
      ]
    });

    // Save OTP to the user collection for verification
    await User.findOneAndUpdate({ email: req.body.email }, { $set: { otp: otp } }, { new: true });

    // Send the request
    const result = await request;

    // Log the result
    console.log(result.body);

    // Send response to client
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const tokenString = token.split(" ")[1]; // Extract the token part from "Bearer <token>"

  jwt.verify(tokenString, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    
    req.user = decoded; // Attach decoded user information to request object
    next();
  });
};

router.post('/likes', verifyToken, async (req, res) => {
  try {
      const { likes } = req.body;
      
      const userId = req.user.id; 

      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { likedMovies: likes } },
          { new: true }
      );

      res.status(200).json({ message: "Likes stored successfully", user: updatedUser });
  } catch (error) {
      console.error("Error storing likes:", error);
      res.status(500).json({ error: "Something went wrong" });
  }
});

router.post('/addReview', verifyToken, async (req, res) => {
    try {
        const { review, movie_id } = req.body;
        const userId = req.user.id;

        // Create a new review document
        const newReview = new Review({
            userId: userId,
            movieId: movie_id,
            review: review
        });

        // Save the new review to the database
        const savedReview = await newReview.save();

        res.status(201).json({ message: 'Review added successfully', review: savedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/reviews/:movie_id', async (req, res) => {
  try {
      const { movie_id } = req.params;
      const reviews = await Review.find({ movieId: movie_id }).populate('userId', '-password');
      // The '-password' argument is optional, it's used to exclude the password field from the user document

      res.status(200).json(reviews);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
