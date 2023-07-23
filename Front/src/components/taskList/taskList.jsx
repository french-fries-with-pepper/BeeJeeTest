import { observer } from "mobx-react-lite";
import sortOrder from "../../utils/sortOrder";
import Task from "../task/task";
import { apiService } from "../../main";
import store from "../../store";
import "./taskList.css";

const changePageHandler = (pageNumber) => {
  apiService
    .getTasks(pageNumber, store.sortOrder)
    .then((res) => res.json())
    .then((res) => {
      const { page, tasks, totalPages } = res;
      store.updateTasks(page, tasks, totalPages);
    });
};
const changeOrderHandler = async (order) => {
  store.updateSortOrder(order);
  apiService
    .getTasks(store.currentPage, order)
    .then((res) => res.json())
    .then((res) => {
      const { page, tasks, totalPages } = res;
      store.updateTasks(page, tasks, totalPages);
    });
};
const createLinks = (n, cur) => {
  const res = [];
  for (let i = 1; i <= n; i++) {
    const name =
      i === parseInt(cur, 10)
        ? "taskList__link taskList__link--active"
        : "taskList__link ";
    res.push(
      <a
        className={name}
        key={i}
        onClick={() => {
          changePageHandler(i);
        }}
      >
        {i}
      </a>
    );
  }
  return res;
};

const orderSelect = (
  <div className="taskList__orderWrap">
    <p className="siteFieldName">Порядок сортировки</p>
    <select
      name=""
      id=""
      onChange={(e) => {
        changeOrderHandler(e.target.value);
      }}
    >
      <option value={sortOrder.nameAsc}>Имя по возрастанию</option>
      <option value={sortOrder.nameDesc}>Имя по убыванию</option>
      <option value={sortOrder.emailAsc}>email по возрастанию</option>
      <option value={sortOrder.emailDesc}>email по убыванию</option>
      <option value={sortOrder.isDoneAsc}>Статус по возрастанию</option>
      <option value={sortOrder.isDoneDesc}>Статус по убыванию</option>
    </select>
  </div>
);

function TaskList() {
  const links = createLinks(store.totalPages, store.currentPage);
  const taskItems = store.tasks.map((task) => (
    <li key={task.id}>
      <Task
        username={task.username}
        email={task.email}
        taskText={task.task_text}
        done={task.done}
        edited={task.edited}
        id={task.id}
      />
    </li>
  ));
  return (
    <div className="taskList">
      {orderSelect}
      <ul className="taskList__list">{taskItems}</ul>
      <div className="taskList__linksWrap">{links}</div>
    </div>
  );
}
export default observer(TaskList);
