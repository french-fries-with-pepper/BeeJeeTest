import db from "../db.js";
import config from "../.config.js";

class TaskController {
  static async getAllTasks(page = 1, order = "done ASC") {
    const totalTasks = (await db.query("SELECT COUNT(*) FROM tasks")).rows[0]
      .count;

    let offset = (page - 1) * config.pageSize;
    if (offset >= totalTasks) offset = 0;
    const totalPages = Math.ceil(totalTasks / config.pageSize);

    const query = `
    SELECT * FROM tasks 
    ORDER BY ${order}
    OFFSET ${offset}
    LIMIT ${config.pageSize}
    `;

    const res = await db.query(query);

    return {
      tasks: res.rows,
      totalPages,
      page,
      totalTasks,
    };
  }

  static async createTask(username, email, taskText) {
    const res = await db.query(
      "INSERT INTO tasks (username, email, task_text, done, edited) values ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, taskText, false, false]
    );
    return res.rows[0];
  }

  static async getTaskById(id) {
    const res = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return res.rows[0];
  }

  static async updateTask(id, taskText, done, edited) {
    const prev = (await db.query("SELECT * FROM tasks WHERE id = $1", [id]))
      .rows[0];
    if (!prev) return null;
    if (taskText === undefined) taskText = prev.task_text;
    edited = edited || prev.edited;
    const res = await db.query(
      "UPDATE tasks SET task_text = $1, done = $2, edited = $3 WHERE id = $4 RETURNING *",
      [taskText, done, edited, id]
    );
    return res.rows[0];
  }

  static async deleteTask(id) {
    const res = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [
      id,
    ]);
    return res;
  }
}

export default TaskController;
