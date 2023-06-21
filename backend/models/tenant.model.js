const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: String,
  profilePicture: {
    data: Buffer,
    contentType: String,
    
  },
  ratings: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: ['Student']
  }
}
,{
  timestamps: true
});



module.exports = mongoose.model('Tenant', tenantSchema);
