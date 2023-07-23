import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiService } from "../../main";

import "./login.css";
import store from "../../store";

function Login() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    store.hideWarning();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = data;
    apiService
      .login(username, password)
      .then((res) => res.json())
      .then((res) => {
        if (res.msg !== "login success") {
          store.updateUserStatus(false);
          store.showWarning("Error creds, try again");
        } else {
          store.updateUserStatus(true);
          navigate("/");
        }
      });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <p className="siteFieldName">имя пользователя</p>
          <input type="text" name="username" onChange={handleChange} required />
        </div>
        <div className="login__field">
          <p className="siteFieldName">пароль</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button>Войти</button>
      </form>
    </div>
  );
}
export default observer(Login);
