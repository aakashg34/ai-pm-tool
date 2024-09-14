module.exports = function(requiredRole) {
    return function(req, res, next) {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ msg: 'Access denied: Insufficient role' });
      }
      next();
    };
  };
  