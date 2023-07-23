import { observer } from "mobx-react-lite";

import "./warningText.css";
import store from "../../store";

function WarningText() {
  return (
    <div className="wt">
      <h2 className="wt__header">Warninng!</h2>
      <p className="wt__text">{store.warningText}</p>
    </div>
  );
}

export default observer(WarningText);
