import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "./pages/Index";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

export default ({ ...appState }) => {
  return (
    <BrowserRouter>
      <Switch>
        {appState.currentUser && [
          <Route
            path="/orders"
            render={() => <Orders {...appState} />}
            key={"orders"}
          />,
          <Route
            path="/admin"
            render={() => <Admin {...appState} />}
            key={"admin"}
          />
        ]}
        <Route render={() => <Index {...appState} />} />
      </Switch>
    </BrowserRouter>
  );
};
