const JWT = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  let jwt = req.cookies.Auth;
  if (!jwt) return res.redirect("/login");
  try {
    let decode = JWT.verify(req.cookies.Auth, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ content: "Invalid token. 🖕" });
  }
  next();
}
module.exports = { authMiddleware };
