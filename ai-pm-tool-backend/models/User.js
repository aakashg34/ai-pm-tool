const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
  timestamps: true,  // Adds createdAt and updatedAt fields
  autoIndex: true    // Automatically create indexes
});

// Add an index on the email for faster lookups
UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);