const jwt = require("jsonwebtoken");

const isAuthenticated = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  isAuthenticated,
};
