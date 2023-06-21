const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ownerSchema = new mongoose.Schema({
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
  profilePicture: String,
  timeOfCreation: {
    type: Date,
    default: Date.now
  },
  ratings: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: ['Owner']
  },
}
,{
  timestamps: true
});



/* ownerSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
}); */

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
