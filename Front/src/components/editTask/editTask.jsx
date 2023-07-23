import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import updateTasksFromServer from "../../utils/updateTasksFromServer";
import { logOutHandler } from "../header/header";
import store from "../../store";
import "./editTask.css";
import { apiService } from "../../main";

function EditTask() {
  const navigate = useNavigate();
  const [taskText, setTaskText] = useState(store.editedTask.taskText);

  const handleUpdate = async () => {
    await apiService
      .updateTask(store.editedTask.id, store.editedTask.done, taskText)
      .then((res) => {
        if (res.status >= 400) {
          logOutHandler();
          navigate("/login");
        }
      });
    updateTasksFromServer(apiService, store);
    store.closeEditPanel();
  };
  const handleCancel = () => store.closeEditPanel();
  return (
    <div className="editTask">
      <h2 className="editTask__text">Редактировать задачу</h2>
      <div>
        <p className="siteFieldName">Username</p>
        <h3>{store.editedTask.username}</h3>
      </div>
      <div>
        <p className="siteFieldName">email</p>
        <h3>{store.editedTask.email}</h3>
      </div>
      <div>
        <p className="siteFieldName">
          edit task with id: {store.editedTask.id}
        </p>
        <textarea
          className="editTask__textArea"
          cols="30"
          rows="10"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        ></textarea>
      </div>
      <div className="editTask__btns">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}
export default observer(EditTask);
