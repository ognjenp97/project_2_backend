import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const Roles = { ADMIN: "Admin", USER: "User" };

export default (allowedRoles) => (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return next(createError(401, "You are not authenticated!"));
  }
  const [authType, token] = authorizationHeader.split(" ");
  if (authType !== "Bearer" || !token) {
    return next(createError(403, "Invalid authorization header!"));
  }
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, decodedToken) => {
    if (err) return next(createError(401, "Token is not valid!"));

    req.user = decodedToken;
    console.log(
      `${req.originalUrl} Req. Roles: ${decodedToken.roles} - Allowed: ${allowedRoles}`
    );
    console.log(" ");

    if (allowedRoles.some((role) => decodedToken.roles.includes(role))) {
      return next();
    }

    return next(
      createError(403, `Unauthorized! Allowed roles: ${allowedRoles}`)
    );
  });
};
