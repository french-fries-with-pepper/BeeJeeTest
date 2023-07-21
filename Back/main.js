import express from "express";

import taskRouter from "./routes/task.router.js";
import loginRouter from "./routes/login.router.js";
import logoutRouter from "./routes/logout.router.js";
import config from "./.config.js";

const port = config.port;
const app = express();

app.use(express.json());


app.use("/task", taskRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.listen(port);
