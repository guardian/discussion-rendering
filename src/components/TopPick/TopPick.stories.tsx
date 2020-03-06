import React from "react";

import { TopPick } from "./TopPick";
import { CommentType } from "../../types";

export default { component: TopPick, title: "TopPick" };

const comment: CommentType = {
  id: 25488498,
  body: "<p>It's still there FrankDeFord - and thanks, I will pass that on</p>",
  date: "26 July 2013 4:35pm",
  isoDateTime: new Date("2013-07-26T15:13:20Z"),
  status: "visible",
  webUrl: "https://discussion.theguardian.com/comment-permalink/25488498",
  apiUrl: "https://discussion.guardianapis.com/discussion-api/comment/25488498",
  numRecommends: 0,
  isHighlighted: false,
  responseTo: {
    displayName: "FrankDeFord",
    commentApiUrl:
      "https://discussion.guardianapis.com/discussion-api/comment/25487686",
    isoDateTime: "2013-07-26T15:13:20Z",
    date: "26 July 2013 4:13pm",
    commentId: 25487686,
    commentWebUrl:
      "https://discussion.theguardian.com/comment-permalink/25487686"
  },
  userProfile: {
    userId: "3150446",
    displayName: "AndyPietrasik",
    webUrl: "https://profile.theguardian.com/user/id/3150446",
    apiUrl:
      "https://discussion.guardianapis.com/discussion-api/profile/3150446",
    avatar: "https://avatar.guim.co.uk/user/3150446",
    secureAvatarUrl: "https://avatar.guim.co.uk/user/3150446",
    badge: [
      {
        name: "Staff"
      }
    ]
  }
};

export const Default = () => <TopPick comment={comment} />;
Default.story = { name: "default" };
