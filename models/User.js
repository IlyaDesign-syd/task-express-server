const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // You can add more fields as needed later, e.g., password hash, etc.
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;