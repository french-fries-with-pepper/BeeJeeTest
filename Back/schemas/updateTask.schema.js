import { body, check, param } from "express-validator";

const atLeastOneField = (value, { req }) => {
  return req.body.taskText !== undefined || req.body.done !== undefined;
};

export default [
  param("id").isInt(),
  body("taskText").optional(),
  body("done").optional(),
  check()
    .custom(atLeastOneField)
    .withMessage("Please provide at least one field"),
];
