import { observer } from "mobx-react-lite";

import Header from "../components/header/header";
import TaskList from "../components/taskList/taskList";
import AddTask from "../components/addTask/addTask";
import store from "../store";

import "./App.css";
import EditTask from "../components/editTask/editTask";

function App() {
  return (
    <>
      <Header />
      <main className="app">
        <TaskList />
        <div className="app__wrap">
          <AddTask />
          {store.isEditPanelShown && <EditTask />}
        </div>
      </main>
    </>
  );
}

export default observer(App);
