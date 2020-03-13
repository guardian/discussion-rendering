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
      shortUrl="/p/39f5z"
      user={aUser}
      configs={{
        discussionD2Uid: "testD2Header",
        discussionApiClientHeader: "testClientHeader"
      }}
    />
  </div>
);
Default.story = { name: "default" };
