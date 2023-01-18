import ReactDOM from "react-dom/client";
import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { BrowserRouter as Router } from "react-router-dom";

export const store = createStore(reducer, middleware);

export const root = ReactDOM.createRoot(
  (document.getElementById("root") as HTMLElement) ||
    (document.createElement("div") as HTMLElement)
);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
