const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        default: 'Pending',  // Default status
        enum: ['Pending', 'In Progress', 'Completed', 'Overdue']
      },
      // Task status: pending, in progress, completed
    dueDate: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the user assigned
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
