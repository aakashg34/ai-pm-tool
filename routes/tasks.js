const express = require('express');
const { createTask, deleteTask, getUserTasks, updateTask } = require('../controller/taskController');
const { authenticate } = require('../middleware/auth'); //  have auth middleware
const router = express.Router();
console.log('createTask:', createTask);
console.log('authenticate:', authenticate);

// Create Task route
router.post('/create', authenticate, createTask);  // Protected route
// Delete Task route
router.delete('/:taskId', authenticate,  deleteTask);

// Get Tasks route
router.get('/',  authenticate, getUserTasks);

// Update Task route
router.put('/:taskId', authenticate, updateTask);

module.exports = router;



// @route   POST api/tasks
// @desc    Create a new task
// @access  Private
// router.post(
//   '/',
//   [
//     auth,
//     [
//       check('title', 'Title is required').not().isEmpty(),
//       check('dueDate', 'Please provide a valid due date').isISO8601()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { title, description, status, dueDate, assignedTo } = req.body;

//     try {
//       const newTask = new Task({
//         title,
//         description,
//         status,
//         dueDate,
//         assignedTo,
//         createdBy: req.user.id  // Assigning task to the logged-in user
//       });

//       const task = await newTask.save();
//       res.json(task);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const tasks = await Task.find({ createdBy: req.user.id }).sort({ dueDate: -1 });
//     res.json(tasks);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // @route   PUT api/tasks/:id
// // @desc    Update a task
// // @access  Private
// router.put('/:id', auth, async (req, res) => {
//   const { title, description, status, dueDate, assignedTo } = req.body;

//   // Build task object
//   const taskFields = {};
//   if (title) taskFields.title = title;
//   if (description) taskFields.description = description;
//   if (status) taskFields.status = status;
//   if (dueDate) taskFields.dueDate = dueDate;
//   if (assignedTo) taskFields.assignedTo = assignedTo;

//   try {
//     let task = await Task.findById(req.params.id);

//     if (!task) return res.status(404).json({ msg: 'Task not found' });

//     // Make sure user owns task
//     if (task.createdBy.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     task = await Task.findByIdAndUpdate(
//       req.params.id,
//       { $set: taskFields },
//       { new: true }
//     );

//     res.json(task);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     let task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ msg: 'Task not found' });
//     }

//     // Make sure user owns task
//     if (task.createdBy.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'Not authorized' });
//     }

//     await Task.findByIdAndRemove(req.params.id);

//     res.json({ msg: 'Task removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
