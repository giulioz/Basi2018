import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "./pages/Index";

export default ({ ...appState }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} {...appState} />
      </Switch>
    </BrowserRouter>
  );
};
