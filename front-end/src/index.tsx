import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { TodoApp } from "./components/TodoApp";
import "./styles/styles.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>
);
