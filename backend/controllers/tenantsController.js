//const Tenant = require('../models/tenant.model');

const getTenants=async(req, res) => {
    Tenant.find()
      .then(tenants => res.json(tenants))
      .catch(err => res.status(400).json('Error: ' + err));
  }

  const createTenants=(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const profilePicture = req.body.profilePicture;
    const ratings = req.body.ratings;
  
    const newTenant = new Tenant({
      name,
      email,
      password,
      address,
      profilePicture,
      ratings,
    });
  
    newTenant.save()
      .then(() => res.json('Tenant added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }






  module.exports={getTenants};