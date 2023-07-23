import express from "express";
import cookieParser from "cookie-parser";

import taskRouter from "./routes/task.router.js";
import loginRouter from "./routes/login.router.js";
import logoutRouter from "./routes/logout.router.js";
import check from "./routes/checkAuth.router.js";
import config from "./.config.js";

const port = config.port;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(express.static("public"));
app.use("/api/task", taskRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/check", check);

app.listen(port);
