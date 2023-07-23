export default class ApiService {
  constructor(URL) {
    this.url = URL;
  }
  getTasks(page, order) {
    return fetch(`${this.url}/task?page=${page}&order=${order}`);
  }
  createTask(username, email, taskText) {
    return fetch(`${this.url}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        taskText,
      }),
    });
  }
  deleteTask(id) {
    return fetch(`${this.url}/task/${id}`, {
      method: "DELETE",
    });
  }
  updateTask(id, done, taskText) {
    return fetch(`${this.url}/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done,
        taskText,
      }),
    });
  }
  getTaskById(id) {
    return fetch(`${this.url}/task/${id}`);
  }
  login(username, password) {
    return fetch(`${this.url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  }
  logout() {
    return fetch(`${this.url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  checkAuth() {
    return fetch(`${this.url}/check`);
  }
}
