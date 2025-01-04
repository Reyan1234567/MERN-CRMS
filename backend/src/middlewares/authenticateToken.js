import jwt from 'jsonwebtoken';

const ACT="aslkflq0urq0wij04jg0iherih0eqrhwe0rgh0eafjqwfopifog"
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  jwt.verify(token, ACT, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Attach decoded token data to the request object
    next();
  });
};

export default authenticateToken;




