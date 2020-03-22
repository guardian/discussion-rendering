import React from "react";
import { App } from "./App";
import { css } from "emotion";

import { mockSignIn } from "./lib/mockSignIn";

export default { component: App, title: "App" };

const aUser = {
  userId: "abc123",
  displayName: "Jane Smith",
  webUrl: "",
  apiUrl: "",
  avatar: "",
  secureAvatarUrl: "",
  badge: [],
  privateFields: {
    canPostComment: true,
    isPremoderated: false,
    hasCommented: true
  }
};

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
    />
  </div>
);
InitialPage.story = { name: "with initial page set to 3" };

export const PageSize = () => (
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
      baseUrl="https://discussion.theguardian.com/discussion-api"
      user={aUser}
      additionalHeaders={{
        "D2-X-UID": "testD2Header",
        "GU-Client": "testClientHeader"
      }}
    />
  </div>
);
PageSize.story = { name: "with page size overridden to 20" };
