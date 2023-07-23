import express from "express";

import validateMiddleware from "../middleware/validate.middleware.js";
import loginController from "../controllers/login.controller.js";
import loginSchema from "../schemas/login.schema.js";

const router = express.Router();

router.post("/", loginSchema, validateMiddleware, async (req, res) => {
  const { username, password } = req.body;
  const result = await loginController.login(username, password);
  if (result) {
    res
      .cookie("token", result, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .send({ msg: "login success" });
  } else {
    res.status(403).send({ msg: "login failed" });
  }
});

export default router;
