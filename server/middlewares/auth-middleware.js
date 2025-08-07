const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Remove 'Bearer ' prefix if present
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWR_SECRET_KEY); // Ensure JWT_SECRET is set in your environment
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;