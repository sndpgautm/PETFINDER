const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organization',
  },
  organizationInfo: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    postCode: { type: String },
    country: { type: String },
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'adoptable',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
});

module.exports = Animal = mongoose.model('animal', AnimalSchema);
