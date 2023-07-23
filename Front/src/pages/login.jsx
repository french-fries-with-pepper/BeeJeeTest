import Header from "../components/header/header";
import Login from "../components/login/login";
import WarningText from "../components/warningText/warningText";
import { observer } from "mobx-react-lite";
import store from "../store";

import "./login.css";

function LoginPage() {
  return (
    <>
      <Header />
      <main className="loginMain">
        <Login />
        {store.isWarningShown && <WarningText />}
      </main>
    </>
  );
}

export default observer(LoginPage);
