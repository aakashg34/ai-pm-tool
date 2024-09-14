const role = require('./role');

// Only project managers and admins can create tasks
router.post('/', [auth, role('project_manager')], async (req, res) => {
  // Task creation logic here...
});

// Only admins can delete tasks
router.delete('/:id', [auth, role('admin')], async (req, res) => {
  // Task deletion logic here...
});
