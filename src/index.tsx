import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

ReactDOM.render(
  <App
    shortUrl="/p/39f5z"
    trackingHeaders={{
      discussionD2Uid: "testD2Header",
      discussionApiClientHeader: "testClientHeader"
    }}
  />,
  document.getElementById("root")
);
