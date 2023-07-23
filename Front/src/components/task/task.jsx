import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import updateTasksFromServer from "../../utils/updateTasksFromServer";
import { logOutHandler } from "../header/header";
import store from "../../store";
import "./task.css";
import { apiService } from "../../main";

function Task(props) {
  const { username, email, taskText, done, edited, id } = props;
  const navigate = useNavigate();

  const openEditHandler = () => {
    store.loadEditedTask(props);
    store.openEditPanel();
  };

  const deleteTaskHandler = async (e) => {
    const id = e.target.name;
    await apiService.deleteTask(id).then((res) => {
      if (res.status >= 400) {
        logOutHandler();
        navigate("/login");
      }
      return res.json();
    });
    updateTasksFromServer(apiService, store);
  };

  const changeTaskStatusHandler = async (e) => {
    const id = e.target.name;
    const isDone = e.target.checked;
    await apiService.updateTask(id, isDone).then((res) => {
      if (res.status >= 400) {
        logOutHandler();
        navigate("/login");
      }
      return res.json();
    });
    updateTasksFromServer(apiService, store);
  };

  const adminCheckBox = (
    <input
      type="checkbox"
      checked={done}
      name={id}
      onChange={changeTaskStatusHandler}
    />
  );
  const checkBox = <input type="checkbox" checked={done} disabled />;
  const adminPanel = (
    <div className="task__adminPanel">
      <button onClick={deleteTaskHandler} name={id}>
        delete
      </button>
      <button onClick={openEditHandler} name={id}>
        edit
      </button>
    </div>
  );
  return (
    <div className="task">
      <header className="task__header">
        <div className="task__fieldWrap">
          <p className="siteFieldName">имя пользователя</p>
          <h3>{username}</h3>
        </div>
        <div className="task__fieldWrap task__fieldWrap--right">
          <p className="siteFieldName">email</p>
          <small>{email}</small>
        </div>
      </header>
      <div className="task__fieldWrap">
        <p className="siteFieldName">текст задачи</p>
        <p className="task__text">{taskText}</p>
      </div>
      <div className="task__fieldWrap">
        <div className="task__statusWrap">
          <p className="siteFieldName">статус</p>
          <p>
            {store.isLoggedIn ? adminCheckBox : checkBox}
            <span className="task__statusText">
              {done ? "Выполнена" : "Не выполнена"}
            </span>
          </p>
        </div>
        {edited && (
          <small className="task__edited">
            отредактировано администратором
          </small>
        )}
      </div>
      {store.isLoggedIn && adminPanel}
    </div>
  );
}
export default observer(Task);
