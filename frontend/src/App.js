import React from "react";

import Routing from "./Routing";
import withStyleConfig from "./components/withStyleConfig";

const appState = {
  currentUser: null
};

export default withStyleConfig()(() => {
  return <Routing {...appState} />;
});
