import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { apiService } from "../../main";
import store from "../../store";

import "./header.css";

export const logOutHandler = (isWarnRequered = true) => {
  isWarnRequered &&
    store.showWarning("Need to login again, something went wrong.");
  apiService.logout().then(store.updateUserStatus(false));
};

function Header() {
  const userStatusLink = store.isLoggedIn ? (
    <a onClick={() => logOutHandler(false)}>Logout</a>
  ) : (
    <Link to={`/login`}>Login Page</Link>
  );

  return (
    <header className="header">
      <nav>
        <ul className="header__list">
          <li>
            <Link to={`/`}>Main Page</Link>
          </li>
          <li>{userStatusLink}</li>
        </ul>
      </nav>
    </header>
  );
}
export default observer(Header);
