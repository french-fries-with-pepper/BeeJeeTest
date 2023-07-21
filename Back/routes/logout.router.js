import express from "express";

import deactivateTokens from "../store/deactivateTokens.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const token = req.get("Authorization");
  deactivateTokens.add(token);
  res
    .cookie("token", "", {
      httpOnly: true,
    })
    .send({ msg: "logout success" });
});

export default router;
