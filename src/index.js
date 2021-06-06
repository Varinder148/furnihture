import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Switch } from "react-router-dom";
import { HashRouter, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate, persistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <PersistGate persistor={persistor}>
        <Switch>
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/" component={Homepage} />
          <Route path="/" component={App} />
        </Switch>
      </PersistGate>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
