import React from "react";

import { CommentType } from "../../types";

import { CommentForm } from "./CommentForm";

export default { component: CommentForm, title: "CommentForm" };

const shortUrl = "/p/39f5z";

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

const aComment: CommentType = {
  id: 25487686,
  body:
    "<p>Beau Jos pizza in Idaho Springs is a great place for mountain pizza pies. Order one with extra thick crust and drizzle it with honey. Y'all can try the Challenge if you fancy, and sketch on your napkins so your art can join their walls. This was 15 years ago, but I hope it's still there! As for music, anything from Boulder's own Big Head Todd &amp; the Monsters - 'Broken Hearted Savior' is a good start, with 'Bittersweet' a good road track. I'm jealous!!!</p>",
  date: "26 July 2013 4:13pm",
  isoDateTime: "2013-07-26T15:13:20Z",
  status: "visible",
  webUrl: "https://discussion.theguardian.com/comment-permalink/25487686",
  apiUrl: "https://discussion.guardianapis.com/discussion-api/comment/25487686",
  numRecommends: 0,
  isHighlighted: false,
  userProfile: {
    userId: "2762428",
    displayName: "FrankDeFord",
    webUrl: "https://profile.theguardian.com/user/id/2762428",
    apiUrl:
      "https://discussion.guardianapis.com/discussion-api/profile/2762428",
    avatar: "https://avatar.guim.co.uk/user/2762428",
    secureAvatarUrl: "https://avatar.guim.co.uk/user/2762428",
    badge: []
  },
  responses: [],
  metaData: {
    commentCount: 2,
    staffCommenterCount: 1,
    editorsPickCount: 0,
    blockedCount: 0,
    responseCount: 1
  }
};

export const Default = () => (
  <CommentForm
    shortUrl={shortUrl}
    user={aUser}
    onAddComment={(commentId, body, user) => {}}
  />
);
Default.story = { name: "default" };

export const Active = () => (
  <CommentForm
    shortUrl={shortUrl}
    user={aUser}
    onAddComment={(commentId, body, user) => {}}
    commentBeingRepliedTo={aComment}
  />
);
Active.story = { name: "form is active" };

export const Premoderated = () => (
  <CommentForm
    shortUrl={shortUrl}
    user={{
      ...aUser,
      privateFields: {
        ...aUser.privateFields,
        isPremoderated: true
      }
    }}
    onAddComment={(commentId, body, user) => {}}
    commentBeingRepliedTo={aComment}
  />
);
Premoderated.story = { name: "user is premoderated" };
