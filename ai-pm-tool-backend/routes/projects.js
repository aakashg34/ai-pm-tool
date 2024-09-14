const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const auth = require('../middleware/auth');

// Routes
router.post('/', auth.authenticate, projectController.createProject);  // Create a project
router.post('/:projectId/tasks', auth.authenticate, projectController.createTaskForProject);  // Attach a task to a project
router.get('/:projectId/tasks', auth.authenticate, projectController.getProjectTasks);  // Get all tasks for a project
router.get('/', auth.authenticate, projectController.getUserProjects);  // Get all projects for the user

module.exports = router;
