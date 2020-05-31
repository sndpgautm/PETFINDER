const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postCode: { type: String, required: true },
  country: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Organization = mongoose.model(
  'organization',
  OrganizationSchema
);
