import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "./pages/Index";

export default ({ ...appState }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Index {...appState} />} />
      </Switch>
    </BrowserRouter>
  );
};
