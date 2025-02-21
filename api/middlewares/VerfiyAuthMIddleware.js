const { verifyToken } = require("../utils/Jwt");
const MESSEGES = require("../utils/Messages");
const HTTP_STATUS_CODES = require("../utils/HttpStatusCodes");
const User = require("../models/user/Users");

// Middleware to verify the token and check if the user is authenticated
const verifyAuthMiddleware = async (req, res, next) => {
  try {
    // Get the token from the headers
    const barearToken = req.headers.authorization;

    if (!barearToken) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSEGES.UNAUTHORIZED });
    }

    // Split the token to get the token value
    const token = barearToken.split(" ")[1];
    if (!token) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSEGES.UNAUTHORIZED });
    }

    // Verify the token and get the decoded value
    const decoded = verifyToken(token);

    // Check if the user exists in the database
    const user = await User.findOne({
      where: { email: decoded.email },
    });

    // If the user does not exist, return unauthorized
    if (!user) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSEGES.UNAUTHORIZED });
    } else {
      // Set the user in the request object
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
