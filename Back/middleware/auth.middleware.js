import jwt from "jsonwebtoken";

import deactivateTokens from "../store/deactivateTokens.js";

import config from "../.config.js";

export default function (req, res, next) {
  const token = req.cookies.token;
  try {
    if (deactivateTokens.has(token)) throw new Error();
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
    next();
  } catch {
    res.status(403).json({ msg: "Error token" });
  }
}
