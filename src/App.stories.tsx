import React from "react";
import { App } from "./App";
import { css } from "emotion";

import { mockSignIn } from "./lib/mockSignIn";

export default { component: App, title: "App" };

mockSignIn();

export const Default = () => (
  <div
    className={css`
      width: 100%;
      max-width: 620px;
    `}
  >
    <App shortUrl="/p/39f5z" />
  </div>
);
Default.story = { name: "default" };
