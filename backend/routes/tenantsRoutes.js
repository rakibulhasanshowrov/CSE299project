const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Tenant = require("../models/tenant.model");
const TenantRating = require("../models/tenantRating.model");

router.post("/register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const profilePicture = req.body.profilePicture;
  const ratings = req.body.ratings;
  const tags = req.body.tags;

  if (!name || !email || !password) {
    return res.status(400).json("Error: Check all the Fields!!");
  }

  const userAvailable = await Tenant.findOne({ email });
  if (userAvailable) {
    return res.status(400).json("Error: Already registered!");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashed password: ", hashedPassword);
  const newTenant = new Tenant({
    name,
    email,
    password: hashedPassword,
    profilePicture,
    address,
    ratings,
    tags,
  });

  try {
    await newTenant.save();
    return res.status(201).json({ _id: newTenant.id, email: newTenant.email });
  } catch (err) {
    return res.status(400).json("Already Registered! " + err);
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json("Error: Check all the Fields!!");
  }

  const tenant = await Tenant.findOne({ email });
  if (!tenant) {
    return res.status(401).json("Error: Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, tenant.password);
  if (!validPassword) {
    return res.status(401).json("Error: Invalid email or password");
  }

  return res.json({ message: "Login the user" });
});

/* router.get("/user/:id", async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    return res.json(tenant);
  } catch (err) {
    return res.status(400).json("Error: " + err);
  }
}); */
router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const tenant = await Tenant.findOne({ email: email });
    return res.json(tenant);
  } catch (err) {
    return res.status(400).json("Error: " + err);
  }
});


/* router.get("/user", async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    return res.json(tenant);
  } catch (err) {
    return res.status(400).json("Error: " + err);
  }
}); */
   

router.get('/ratings', async (req, res) => {
  try {
    const ratings = await TenantRating.find({});
    res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST endpoint for tenant ratings
router.post('/ratings', (req, res) => {
  // Extract the data from the request body
  const { email, rating, comment } = req.body;

  // Validate the data
  if (!email || !rating) {
    return res.status(400).json({ error: 'Email and rating are required' });
  }

  // Create a new TenantRating document
  const tenantRating = new TenantRating({
    email,
    rating,
    comment
  });

  // Increase the counter by 1
  tenantRating.counter += 1;

  // Save the TenantRating document
  tenantRating.save()
    .then((savedRating) => {
      res.status(200).json(savedRating);
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred while saving the rating' });
    });
});




// POST route to update tenant rating and calculate average
router.post('/review', async (req, res) => {
  const { email, rating, comment } = req.body;

  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    // Find the tenant rating document in the database
    let tenantRating = await TenantRating.findOne({ email });

    if (!tenantRating) {
      // Create a new tenant rating document if not found
      tenantRating = new TenantRating({
        email,
        rating,
        comment,
        counter: 1
      });
    } else {
      const { rating: currentRating, counter } = tenantRating;

      // Calculate the new average rating and increment the counter
      const newCounter = counter + 1;
      const newRating = (currentRating + rating) / newCounter;

      // Update the tenant rating and comment
      tenantRating.rating = newRating;
      tenantRating.comment = comment;
      tenantRating.counter = newCounter;
    }

    // Save the updated or new tenant rating
    await tenantRating.save();

    res.json({ message: 'Rating updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


