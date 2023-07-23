import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "ok" });
});
export default router;