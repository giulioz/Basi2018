import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "./pages/Index";
import Orders from "./pages/Orders";

export default ({ ...appState }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Index {...appState} />} />
        <Route path="/orders" exact render={() => <Orders {...appState} />} />
      </Switch>
    </BrowserRouter>
  );
};
