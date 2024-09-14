const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.authenticate = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('authorization');
  
  // Check if no token is provided
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Split "Bearer <token>" and extract token
  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ msg: 'Authorization format is Bearer <token>' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token payload to req.user
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
