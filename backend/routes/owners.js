const express=require('express')
const router = require('express').Router();
const Owner = require('../models/owner.model');

router.route('/').get(async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/register').post(async (req, res) => {
  const { name, email, password, address, profilePicture } = req.body;

  const newOwner = new Owner({
    name,
    email,
    password,
    address,
    profilePicture,
  });

  try {
    await newOwner.save();
    res.json('Owner added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    res.json(owner);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await Owner.findByIdAndDelete(req.params.id);
    res.json('Owner deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/update/:id').post(async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    owner.name = req.body.name;
    owner.email = req.body.email;
    owner.password = req.body.password;
    owner.address = req.body.address;
    owner.profilePicture = req.body.profilePicture;
    await owner.save();
    res.json('Owner updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post("/register",(req,res) =>{
  res.json({message:"register the user"})
});
router.post("/login",(req,res) =>{
  res.json({message:"login the user"})
});
router.get("/user",(req,res) =>{
  res.json({message:" user information"})
});

module.exports = router;
