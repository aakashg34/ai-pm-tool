const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Completed', 'On Hold']
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user who owns the project
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  visibility: { type: String, default: 'public', enum: ['public', 'private'] },
}, {
  timestamps: true,
  autoIndex: true
});

// Add an index for owner for faster queries
ProjectSchema.index({ owner: 1 });

module.exports = mongoose.model('Project', ProjectSchema);
