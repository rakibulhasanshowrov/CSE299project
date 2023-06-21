
const router = require('express').Router();
const Tenant = require('../models/tenant.model');

router.route('/').get(async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    res.json(tenant);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/').post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const profilePicture = req.body.profilePicture;
  const ratings = req.body.ratings;
  const tags=req.body.tags;

  

  const newTenant = new Tenant({
    name,
    email,
    password,
    address,
    profilePicture,
    ratings,
    tags,
  });

  try {
    await newTenant.save();
    res.json('Tenant added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await Tenant.findByIdAndDelete(req.params.id);
    res.json('Tenant deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/update/:id').post(async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    tenant.name = req.body.name;
    tenant.email = req.body.email;
    tenant.password = req.body.password;
    tenant.address = req.body.address;
    tenant.profilePicture = req.body.profilePicture;
    tenant.ratings = req.body.ratings;

    await tenant.save();
    res.json('Tenant updated!');
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
