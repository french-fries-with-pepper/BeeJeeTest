import { query } from "express-validator";

const orderArr = [
  "username ASC",
  "username DESC",
  "email ASC",
  "email DESC",
  "done ASC",
  "done DESC",
];

export default [
  query("page").isInt({ min: 1 }),
  query("order").optional(true).isIn(orderArr),
];
