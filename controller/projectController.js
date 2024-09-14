const Project = require('../models/Project');
const Task = require('../models/Task');

// Create a new project
exports.createProject = async (req, res) => {
    const { name, description, startDate, endDate, visibility } = req.body;
    const userId = req.user.userId;  // Assuming the user is authenticated via JWT

    try {
        const newProject = new Project({
            name,
            description,
            owner: userId, // Owner of the project is the authenticated user
            startDate,
            endDate,
            visibility
        });

        const project = await newProject.save();
        res.status(201).json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Attach a task to a project
exports.createTaskForProject = async (req, res) => {
    const { title, description, dueDate, assignedTo, visibility } = req.body;
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        const newTask = new Task({
            title,
            description,
            dueDate,
            assignedTo,
            projectId,  // Linking the task to the project
            visibility
        });

        const task = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get all tasks for a project
exports.getProjectTasks = async (req, res) => {
    const { projectId } = req.params;

    try {
        const tasks = await Task.find({ projectId });
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

// Get all projects for the authenticated user
exports.getUserProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.userId });
        res.status(200).json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
