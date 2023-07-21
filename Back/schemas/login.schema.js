import { body } from "express-validator";

export default [
  body("username").notEmpty().isLength({ min: 2 }),
  body("password").notEmpty().isLength({ min: 2 }),
];
