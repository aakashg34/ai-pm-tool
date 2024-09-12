const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// @route   POST api/projects
// @desc    Create a new project
// @access  Private
router.post(
  '/',
  [
    auth,
    [check('name', 'Project name is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, deadline, team } = req.body;

    try {
      const newProject = new Project({
        name,
        description,
        deadline,
        team,
        createdBy: req.user.id
      });

      const project = await newProject.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
