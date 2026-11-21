const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'Token ausente' });
  try {
    const decoded = jwt.verify(h.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
};