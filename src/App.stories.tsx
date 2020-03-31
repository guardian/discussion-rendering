import React from "react";
import { App } from "./App";
import { css } from "emotion";

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
      pillar="culture"
      isClosedForComments={false}
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
      pillar="lifestyle"
      isClosedForComments={false}
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
      pageSizeOverride={50}
      orderByOverride={"oldest"}
      baseUrl="https://discussion.theguardian.com/discussion-api"
      pillar="opinion"
      isClosedForComments={false}
      user={aUser}
      additionalHeaders={{
        "D2-X-UID": "testD2Header",
        "GU-Client": "testClientHeader"
      }}
      expanded={false}
    />
  </div>
);
Overrides.story = { name: "with page size overridden to 50" };

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
      pillar="sport"
      isClosedForComments={false}
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

export const Closed = () => (
  <div
    className={css`
      width: 100%;
      max-width: 620px;
    `}
  >
    <App
      shortUrl="p/39f5z"
      baseUrl="https://discussion.theguardian.com/discussion-api"
      pillar="lifestyle"
      isClosedForComments={true}
      user={aUser}
      additionalHeaders={{
        "D2-X-UID": "testD2Header",
        "GU-Client": "testClientHeader"
      }}
      expanded={true}
    />
  </div>
);
Closed.story = { name: "closed for comments" };
