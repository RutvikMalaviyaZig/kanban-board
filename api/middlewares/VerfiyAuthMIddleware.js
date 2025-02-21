const { verifyToken } = require("../utils/Jwt");
const MESSEGES = require("../utils/Messages");
const HTTP_STATUS_CODES = require("../utils/HttpStatusCodes");
const User = require("../models/user/Users");
const sequelize = require("../../config/database");
const {Op} = require('sequelize')

const verifyAuthMiddleware = async (req, res, next) => {
  try {
    const barearToken = req.headers.authorization;
    
    if (!barearToken) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSEGES.UNAUTHORIZED });
    }
    const token = barearToken.split(" ")[1];
    if (!token) {
      return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: MESSEGES.UNAUTHORIZED });
    }
    
    const decoded = verifyToken(token);

    const user = await User.findOne({
      where: { email: decoded.email },
    });
    
    
    if (!user) {
      return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: MESSEGES.UNAUTHORIZED });
    } else {
      req.user = decoded;
    }
    next();
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: MESSEGES.UNAUTHORIZED });
  }
};

module.exports = { verifyAuthMiddleware };
