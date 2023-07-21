import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
import config from "../.config.js";

const createToken = (username, isAdmin) => {
  const payload = {
    username,
    isAdmin,
  };
  return jwt.sign(payload, config.jwtSecret);
};

export default {
  async login(username, password) {
    const res = (
      await db.query("SELECT * FROM users WHERE username = $1", [username])
    ).rows[0];
    if (!res) return false;
    if (bcrypt.compareSync(password, res.pass_hash)) {
      return createToken(username, res.is_admin);
    }
    return false;
  },
};
