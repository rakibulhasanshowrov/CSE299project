const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const AddList = require('../models/addList.model');
const fs = require('fs');
const path = require('path');

// Set up multer middleware to handle file uploads
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'));
    }
  }
}).single('roomPic');

// POST endpoint to create a new ad in the database
router.post('/postAdd', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      //const buffer = req.file.buffer;
    //  const base64Image = buffer.toString('base64');

      const newAdd = new AddList({
        //roomPic: base64Image,
        roomPic:req.file.buffer,
        location: req.body.location,
        price: req.body.price,
        Month: req.body.month,
        singleOrShared: req.body.singleShared,
        contactNo: req.body.contactNo,
        RestrictionStatus: req.body.restrictionStatus,
        Description: req.body.description
      });

      await newAdd.save();
      res.status(201).json({ message: 'Ad added successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});


// GET endpoint to retrieve all ads from the database
router.get('/get', async (req, res) => {
  try {
    const ads = await AddList.find().lean().exec();
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get('/search', async (req, res) => {
  try {
    const { price, month, location, description } = req.query;

    const query = addList.find();

    if (price) {
      query.where('price').equals(price);
    }

    if (month) {
      query.where('Month').equals(month);
    }

    if (location) {
      query.where('location').equals(location);
    }

    if (description) {
      query.where('Description').regex(new RegExp(description, 'i'));
    }

    const results = await query.exec();

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});
module.exports = router; 


