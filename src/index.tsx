import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { getDiscussion, defaultDiscussionOptions, getProfile } from "./api";

getDiscussion("/p/d6nqa", defaultDiscussionOptions)
  .then(json => console.log(json))
  .catch(error => console.log(error));

getProfile()
  .then(json => console.log(json))
  .catch(error => console.log(error));

ReactDOM.render(<App />, document.getElementById("root"));
