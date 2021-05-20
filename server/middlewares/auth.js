const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.JWTSECRET);

    req.user = verified.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Unauthorized" });
  }
}
module.exports = auth;
