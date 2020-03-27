import { UserProfile, CommentType } from "../types";

export const simulateNewComment = (
  commentId: number,
  body: string,
  user: UserProfile,
  commentBeingRepliedTo?: CommentType
): CommentType => {
  // The returned object below is a simulation of the comment that was created that
  // we add to our local state so that the reader has immediate feedback. We do
  // this because the api has a 1 minute cache expiry so simply refreshing the
  // main list of comments often won't return the comment just added.
  // Edge case: If the user _does_ refresh then this local state will be overridden
  // by the new api response and - if the refresh was within 60 seconds - the
  // reader's comment will not be present. The same edge case exists in frontend.
  return {
    id: commentId,
    body,
    date: Date(),
    isoDateTime: new Date().toISOString(),
    status: "visible",
    webUrl: "", //TODO:
    apiUrl: "", //TODO:
    numRecommends: 0,
    isHighlighted: true,
    userProfile: {
      userId: user.userId,
      displayName: user.displayName,
      webUrl: user.webUrl,
      apiUrl: user.apiUrl,
      avatar: user.avatar,
      secureAvatarUrl: user.secureAvatarUrl,
      badge: user.badge
    },
    ...(commentBeingRepliedTo
      ? {
          responseTo: {
            displayName: commentBeingRepliedTo.userProfile.displayName,
            commentApiUrl: "", //TODO:
            isoDateTime: commentBeingRepliedTo.isoDateTime,
            date: commentBeingRepliedTo.date,
            commentId: commentBeingRepliedTo.id,
            commentWebUrl: "" //TODO:
          }
        }
      : {
          responses: []
        })
  };
};
