const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
    //   console.log(token)
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   console.log(decoded)
      loggedUser = await User.findById(decoded.id).select("-password");
    //  console.log(loggedUser)
      next();
    } catch (error) {
        throw new Error("Not authorized, token failed")
    }
  }
  if (!token) {
      res.status(401)
      throw new Error("Not authorized , no token")
  }
});


module.exports = {protect}