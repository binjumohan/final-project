const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
   
  let token;

  // ✅ Check header first
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
console.log("TOKEN FROM COOKIE:", req.cookies.token);
  // ✅ If not, check cookie
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json("No token");
  }

  try {
    console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Invalid token");
  }
};

module.exports = authMiddleware;