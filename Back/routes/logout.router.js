import express from "express";

import deactivateTokens from "../store/deactivateTokens.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const token = req.cookies.token;
  deactivateTokens.add(token);
  res
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .send({ msg: "logout success" });
});

export default router;
