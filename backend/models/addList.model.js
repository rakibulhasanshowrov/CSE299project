const mongoose = require('mongoose');

const addListSchema = new mongoose.Schema({
  roomPic: {
    type: Buffer,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  Month: {
    type: String,
    required: true
  },
  singleOrShared: {
    type: String,
    enum: ['single', 'shared'],
    required: true,
    default:"shared"
  },
  contactNo: {
    type: String,
    required: true,
    match: /^01[0-9]{9}$/ // regex to validate 11 digit phone number starting with 01
  },
  RestrictionStatus: {
    type: String,
    enum: ['Restricted', 'No Restriction'],
    required: true,
    default:"Restricted"
  },
  Description: {
    type: String,
    required: true
  }
});

const addList = mongoose.model('addList', addListSchema);

module.exports = addList;
