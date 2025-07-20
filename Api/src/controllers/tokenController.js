import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../constants.js";

class TokenController {
  constructor(service) {
    this.service = service;
  }
  generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
  }

  validateToken(token) {
    return jwt.verify(token, JWT_SECRET);
  }

  checkRole = (role) => {
    return (req, res, next) => {
      if (role === "public") {
        next();
        return;
      }
      if (role === "admin" || role === "user") {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ error: "Authorization header is required" });
        }
        try {
          const decoded = this.validateToken(authHeader);
          const user = this.service.getUser(decoded.userId);
          req.user = user;
          next();
        } catch (error) {
          return res.status(401).json({ error: "Invalid token" });
        }
      } else {
        // throw new Error(`Invalid role: ${role}`);
        res.status(400).json({ error: `Invalid role: ${role}` });
      }
    };
  };
}

export default TokenController;
