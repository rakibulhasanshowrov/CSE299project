const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantRatingSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  comment: {
    type: String,
    maxlength: 200,
    default: ''
  },
  counter: {
    type: Number,
    default: 0
  }
});

const TenantRating = mongoose.model('TenantRating', tenantRatingSchema);

module.exports = TenantRating;

