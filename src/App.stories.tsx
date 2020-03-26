import React from "react";
import { App } from "./App";
import { css } from "emotion";

import { mockSignIn } from "./lib/mockSignIn";
import { user as aUser } from "./fixtures/user";

export default { component: App, title: "App" };

mockSignIn();

export const Default = () => (
  <div
    className={css`
      width: 100%;
      max-width: 620px;
    `}
  >
    <App
      shortUrl="p/39f5z"
      baseUrl="https://discussion.theguardian.com/discussion-api"
      user={aUser}
      additionalHeaders={{
        "D2-X-UID": "testD2Header",
        "GU-Client": "testClientHeader"
      }}
      expanded={false}
    />
  </div>
);
Default.story = { name: "default" };

export const InitialPage = () => (
  <div
    className={css`
      width: 100%;
      max-width: 620px;
    `}
  >
    <App
      shortUrl="p/39f5z"
      initialPage={3}
      baseUrl="https://discussion.theguardian.com/discussion-api"
      user={aUser}
      additionalHeaders={{
        "D2-X-UID": "testD2Header",
        "GU-Client": "testClientHeader"
      }}
      expanded={false}
    />
  </div>
);
InitialPage.story = { name: "with initial page set to 3" };

export const Overrides = () => (
  <div
    className={css`
      width: 100%;
      max-width: 620px;
    `}
  >
    <App
      shortUrl="p/39f5z"
      initialPage={3}
      pageSizeOverride={20}
      orderByOverride={"oldest"}
      baseUrl="https://discussion.theguardian.com/discussion-api"
      user={aUser}
      additionalHeaders={{
        "D2-X-UID": "testD2Header",
        "GU-Client": "testClientHeader"
      }}
      expanded={false}
    />
  </div>
);
Overrides.story = { name: "with page size overridden to 20" };

export const Expanded = () => (
  <div
    className={css`
      width: 100%;
      max-width: 620px;
    `}
  >
    <App
      shortUrl="p/39f5z"
      initialPage={3}
      baseUrl="https://discussion.theguardian.com/discussion-api"
      user={aUser}
      additionalHeaders={{
        "D2-X-UID": "testD2Header",
        "GU-Client": "testClientHeader"
      }}
      expanded={true}
    />
  </div>
);
Expanded.story = { name: "expanded by default and on page 3" };
