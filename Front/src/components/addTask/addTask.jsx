import { useState } from "react";
import { observer } from "mobx-react-lite";

import updateTasksFromServer from "../../utils/updateTasksFromServer";
import { apiService } from "../../main";
import store from "../../store";
import "./addTask.css";

function AddTask() {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, taskText } = data;
    await apiService.createTask(username, email, taskText);
    updateTasksFromServer(apiService, store);
  };
  return (
    <div className="addTask">
      <form className="addTask__form" onSubmit={handleSubmit}>
        <div className="addTask__field">
          <p className="siteFieldName">имя пользователя</p>
          <input type="text" name="username" onChange={handleChange} required />
        </div>
        <div className="addTask__field">
          <p className="siteFieldName">email</p>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="addTask__field">
          <p className="siteFieldName">текст задачи</p>
          <textarea
            required
            name="taskText"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
        <button>Добавить задачу</button>
      </form>
    </div>
  );
}
export default observer(AddTask);
