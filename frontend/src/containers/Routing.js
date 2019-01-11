import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => "test"} />
      </Switch>
    </BrowserRouter>
  );
};
