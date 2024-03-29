const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User-Model");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
//signup route
router.post("/signup", async (req, res) => {
  const { email, password} = req.body;

  try {
    //checking if user exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hashing the pass
    const hashedPassword = await bcrypt.hash(password, 10);
    //new user
    const newUser = new User({ email, password: hashedPassword});
    //saving the user
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
    try{
        //checking if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials User Not Found"});
        }
        //checking if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials Password"});
        }
        //creating a token
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({token, user});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.put("/preferences", async (req, res) => {
  const { userId, preferences } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.preferences = preferences;
    await user.save();
    res.status(200).json({ message: "Preferences saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
// console.log(JWT_SECRET);

module.exports = router;
