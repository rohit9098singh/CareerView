
import jwt from "jsonwebtoken"
import response from "../utils/responseHandler.js";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies["access_token"];
  if (!token) {
    return response(res, 401, "User not Authenticated, no token available");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return response(res, 401, "User not authorized, invalid payload");
    }
    req.id = decoded.userId;
    next();  
  } catch (error) {
    return response(res, 400, "Not authorized, token not valid or expired", error.message);
  }
};

export default authenticateUser
