import React from "react";
import { Picks } from "./Picks";
import { css } from "emotion";

export default { component: Picks, title: "Pick" };

const commentArray = [
  {
    id: 54748781,
    body: "<p>interesting article!</p>",
    date: "30 June 2015 6:25pm",
    isoDateTime: "2015-06-30T17:25:41Z",
    status: "visible",
    webUrl: "https://discussion.theguardian.com/comment-permalink/54748781",
    apiUrl:
      "https://discussion.guardianapis.com/discussion-api/comment/54748781",
    numRecommends: 10,
    isHighlighted: true,
    userProfile: {
      userId: "13552794",
      displayName: "John Duffell",
      webUrl: "https://profile.theguardian.com/user/id/13552794",
      apiUrl:
        "https://discussion.guardianapis.com/discussion-api/profile/13552794",
      avatar: "https://avatar.guim.co.uk/user/13552794",
      secureAvatarUrl: "https://avatar.guim.co.uk/user/13552794",
      badge: [
        {
          name: "Staff"
        }
      ]
    }
  },
  {
    id: 56528772,
    body: "<p>interesting article</p>",
    date: "28 July 2015 3:56pm",
    isoDateTime: "2015-07-28T14:56:08Z",
    status: "visible",
    webUrl: "https://discussion.theguardian.com/comment-permalink/56528772",
    apiUrl:
      "https://discussion.guardianapis.com/discussion-api/comment/56528772",
    numRecommends: 5,
    isHighlighted: true,
    userProfile: {
      userId: "13552794",
      displayName: "John Duffell",
      webUrl: "https://profile.theguardian.com/user/id/13552794",
      apiUrl:
        "https://discussion.guardianapis.com/discussion-api/profile/13552794",
      avatar: "https://avatar.guim.co.uk/user/13552794",
      secureAvatarUrl: "https://avatar.guim.co.uk/user/13552794",
      badge: [
        {
          name: "Staff"
        }
      ]
    }
  },
  {
    id: 63781636,
    body: "<p>test</p>",
    date: "23 November 2015 10:29am",
    isoDateTime: "2015-11-23T10:29:05Z",
    status: "visible",
    webUrl: "https://discussion.theguardian.com/comment-permalink/63781636",
    apiUrl:
      "https://discussion.guardianapis.com/discussion-api/comment/63781636",
    numRecommends: 1,
    isHighlighted: true,
    userProfile: {
      userId: "1186733",
      displayName: "GideonGoldberg",
      webUrl: "https://profile.theguardian.com/user/id/1186733",
      apiUrl:
        "https://discussion.guardianapis.com/discussion-api/profile/1186733",
      avatar: "https://avatar.guim.co.uk/user/1186733",
      secureAvatarUrl: "https://avatar.guim.co.uk/user/1186733",
      badge: []
    }
  },
  {
    id: 137710768,
    body: "<p>We just don't know.</p>",
    date: "27 January 2020 3:00pm",
    isoDateTime: "2020-01-27T15:00:56Z",
    status: "visible",
    webUrl: "https://discussion.theguardian.com/comment-permalink/137710768",
    apiUrl:
      "https://discussion.guardianapis.com/discussion-api/comment/137710768",
    numRecommends: 0,
    isHighlighted: true,
    responseTo: {
      displayName: "makanim",
      commentApiUrl:
        "https://discussion.guardianapis.com/discussion-api/comment/137440398",
      isoDateTime: "2020-01-16T15:09:46Z",
      date: "16 January 2020 3:09pm",
      commentId: 137440398,
      commentWebUrl:
        "https://discussion.theguardian.com/comment-permalink/137440398"
    },
    userProfile: {
      userId: "101885881",
      displayName: "MrGuardianTestMan",
      webUrl: "https://profile.theguardian.com/user/id/101885881",
      apiUrl:
        "https://discussion.guardianapis.com/discussion-api/profile/101885881",
      avatar: "https://avatar.guim.co.uk/user/101885881",
      secureAvatarUrl: "https://avatar.guim.co.uk/user/101885881",
      badge: [
        {
          name: "Staff"
        }
      ]
    }
  }
];

export const Default = () => (
  <div
    className={css`
      width: 100%;
      max-width: 600px;
    `}
  >
    <Picks comments={commentArray} />
  </div>
);
Default.story = { name: "Picks" };
