const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    console.log(req.user);
     // Log req.user to check if it contains user data
    const { title, description } = req.body;
    const userId = req.user.userId; // Assuming the JWT payload contains { userId: ... }
  
    try {
      const newTask = new Task({
        title,
        description,
        assignedTo: userId // Assuming the task is assigned to the logged-in user
      });
  
      const task = await newTask.save();
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  };

exports.deleteTask = async (req, res) => {
    console.log('delete Task function called');
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await task.deleteOne();
        res.status(200).json({ message: 'Task deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getUserTasks = async (req, res) => {
    console.log('get user Task function called, UserId:', req.user.userId); // Debugging
    try {
        const tasks = await Task.find({ assignedTo: req.user.userId });
        console.log('Found Tasks:', tasks); // Debugging
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.updateTask = async (req, res) => {
    console.log('Update Task function called');
    try {
        const { taskId } = req.params;
        const { title, description, dueDate, status } = req.body;

        let task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Only the user who created the task can update it
        if (task.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Update the task fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;

        await task.save();
        res.status(200).json({ message: 'Task updated successfully!', task });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllTasks = async (req, res) => {
    console.log(req)
    try {
      const tasks = await Task.find({ projectId: req.user.projectId, visibility: 'public' });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  exports.getFilteredTasks = async (req, res) => {
    const { status, assignedTo, sortBy } = req.query;
    let query = { projectId: req.user.projectId, visibility: 'public' };
  
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;
  
    try {
      const tasks = await Task.find(query).sort({ [sortBy]: 1 }); // Sort based on query param
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

// module.exports = { createTask, deleteTask, getUserTasks, updateTask };



