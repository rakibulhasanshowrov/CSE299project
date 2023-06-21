const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Owner = require("../models/owner.model");
const OwnerRating = require("../models/ownerRating.model");
router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const profilePicture = req.body.profilePicture;
  const ratings = req.body.ratings;
  const tags = req.body.tags;

  if (!name || !email || !password) {
    return res.status(400).json("Error: " + "Check all the Fields!!");
  }

  const userAvailable = await Owner.findOne({ email });
  if (userAvailable) {
    return res.status(400).json("Error: " + "Already registered!");
  }

  //hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashed password: ", hashedPassword);
  const newOwner = new Owner({
    name,
    email,
    password: hashedPassword,
    profilePicture,
    address,
    ratings,
    tags,
  });

  try {
    await newOwner.save();
    return res.status(201).json({ _id: newOwner.id, email: newOwner.email });
  } catch (err) {
    return res.status(400).json("Already Registered!" + err);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json("Error: " + "Check all the Fields!!");
  }

  const owner = await Owner.findOne({ email });
  if (!owner) {
    return res.status(401).json("Error: " + "Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, owner.password);
  if (!validPassword) {
    return res.status(401).json("Error: " + "Invalid email or password");
  }

  return res.json({ message: "Login the user" });
});
router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const owner = await Owner.findOne({ email: email });
    return res.json(owner);
  } catch (err) {
    return res.status(400).json("Error: " + err);
  }
});
/* router.get("/user/:id", async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    return res.json(owner);
  } catch (err) {
    return res.status(400).json("Error: " + err);
  }
});
router.get("/user", async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    return res.json(owner);
  } catch (err) {
    return res.status(400).json("Error: " + err);
  }
}); */



router.get('/ratings', async (req, res) => {
  try {
    const ratings = await OwnerRating.find();
    res.json(ratings);
  } catch (error) {
    console.error('Error fetching ratings', error);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
});

router.post('/ratings', (req, res) => {
  // Extract the data from the request body
  const { email, rating, comment } = req.body;

  // Validate the data
  if (!email || !rating) {
    return res.status(400).json({ error: 'Email and rating are required' });
  }

  // Create a new TenantRating document
  const ownerRating = new OwnerRating({
    email,
    rating,
    comment
  });

  // Increase the counter by 1
  ownerRating.counter += 1;

  // Save the TenantRating document
  ownerRating.save()
    .then((savedRating) => {
      res.status(200).json(savedRating);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while saving the rating' });
    });
});


module.exports = router;



