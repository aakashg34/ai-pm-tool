const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'In Progress', 'Completed', 'Overdue']
  },
  dueDate: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // User assigned to the task
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },  // New field for project-based tasks
  visibility: { type: String, default: 'public', enum: ['public', 'private'] },
  createdDate: { type: Date, default: Date.now }
}, {
  timestamps: true,
  autoIndex: true
});

// Add index on assignedTo and projectId
// TaskSchema.index({ assignedTo: 1 });
// TaskSchema.index({ projectId: 1 });
// Full-text search index on title and description
TaskSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Task', TaskSchema);
