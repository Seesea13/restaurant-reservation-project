// middleware/authorizeRole.js
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Insufficient permissions. Access denied.' });
    }
    next();
  };
};

module.exports = authorizeRole;
