import { body } from "express-validator";

export default [
  body("username").isLength({ min: 2 }),
  body("email").isEmail(),
  body("taskText").notEmpty(),
];
