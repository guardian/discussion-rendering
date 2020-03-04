import React from "react";

import { Comment } from "./Comment";
import { CommentType } from "../../types";

export default { title: "Comment" };

const commentData: CommentType = {
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

const staffUser = {
  userId: "abc123",
  displayName: "Jane Smith",
  webUrl: "",
  apiUrl: "",
  avatar: "",
  secureAvatarUrl: "",
  badge: [{ name: "Staff" }],
  privateFields: {
    canPostComment: true,
    isPremoderated: false,
    hasCommented: true
  }
};

export const Default = () => (
  <Comment
    comment={commentData}
    pillar={"sport"}
    setCommentBeingRepliedTo={() => {}}
    isReply={false}
  />
);
Default.story = { name: "default" };

export const ReplyComment = () => (
  <Comment
    comment={commentData}
    pillar={"sport"}
    setCommentBeingRepliedTo={() => {}}
    isReply={true}
  />
);
Default.story = { name: "default" };

export const UnpickedComment = () => (
  <Comment
    comment={commentData}
    pillar={"sport"}
    setCommentBeingRepliedTo={() => {}}
    isReply={false}
  />
);
UnpickedComment.story = { name: "Unpicked Comment" };

export const PickedComment = () => (
  <Comment
    comment={{ ...commentData, isHighlighted: true }}
    pillar={"sport"}
    setCommentBeingRepliedTo={() => {}}
    isReply={false}
  />
);
PickedComment.story = { name: "Picked Comment" };

export const StaffUserComment = () => (
  <Comment
    comment={{
      ...commentData,
      userProfile: {
        ...commentData.userProfile,
        badge: [
          {
            name: "Staff"
          }
        ]
      }
    }}
    pillar={"sport"}
    setCommentBeingRepliedTo={() => {}}
    user={staffUser}
    isReply={false}
  />
);
StaffUserComment.story = { name: "Staff User Comment" };

export const PickedStaffUserComment = () => (
  <Comment
    comment={{
      ...commentData,
      userProfile: {
        ...commentData.userProfile,
        badge: [
          {
            name: "Staff"
          }
        ]
      },
      isHighlighted: true
    }}
    pillar={"sport"}
    setCommentBeingRepliedTo={() => {}}
    user={staffUser}
    isReply={false}
  />
);
PickedStaffUserComment.story = { name: "Picked Staff User Comment" };
