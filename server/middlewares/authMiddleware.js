import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token,"hele");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};
 
export default authenticateJWT;
