import React, { useState, useEffect } from "react";
import { css } from "emotion";

import {
  CommentType,
  FilterOptions,
  UserProfile,
  CommentResponse
} from "./types";
import { getDiscussion, getCommentCount, comment, reply } from "./lib/api";
import { CommentList } from "./components/CommentList/CommentList";
import { TopPicks } from "./components/TopPicks/TopPicks";
import { CommentForm } from "./components/CommentForm/CommentForm";
import { Filters } from "./components/Filters/Filters";
import { Pagination } from "./components/Pagination/Pagination";
import { FirstCommentWelcome } from "./components/FirstCommentWelcome/FirstCommentWelcome";

type Props = {
  shortUrl: string;
  user?: UserProfile;
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

const footerStyles = css`
  display: flex;
  justify-content: flex-end;
`;

export const App = ({ shortUrl, user }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    orderBy: "newest",
    pageSize: 25,
    threads: "unthreaded",
    page: 1
  });
  const [commentCount, setCommentCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<number>(0);

  const simulateNewComment = (
    commentId: number,
    body: string,
    user: UserProfile
  ) => {
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
      isoDateTime: new Date(),
      status: "visible",
      webUrl: "TODO",
      apiUrl: "TODO",
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
      }
    };
  };

  const [commentError, setCommentError] = useState<String>("");
  const [commentIsFirstPost, setCommentIsFirstPost] = useState<boolean>(false);

  const submitComment = async (
    shortUrl: string,
    body: string,
    user: UserProfile
  ) => {
    // Reset
    setCommentError("");
    setCommentIsFirstPost(false);

    const response: CommentResponse = await comment(shortUrl, body);
    if (response.statusCode === 420) {
      setCommentError(
        "You can only post one comment every minute. Please try again in a moment."
      );
    } else if (response.message === "USERNAME_MISSING") {
      // Reader has never posted before and needs to choose a username
      setCommentIsFirstPost(true);
    } else if (response.status === "ok") {
      // TODO: response.message is the id of the comment that was created on the server
    }
  };

  const [replyError, setReplyError] = useState<String>("");
  const [replyIsFirstPost, setReplyIsFirstPost] = useState<boolean>(false);

  const submitReply = async (
    shortUrl: string,
    body: string,
    user: UserProfile,
    parentCommentId: string
  ) => {
    // Reset
    setReplyError("");
    setReplyIsFirstPost(false);

    const response: CommentResponse = await reply(
      shortUrl,
      body,
      parentCommentId
    );
    if (response.statusCode === 420) {
      setReplyError(
        "You can only post one comment every minute. Please try again in a moment."
      );
    } else if (response.message === "USERNAME_MISSING") {
      // Reader has never posted before and needs to choose a username
      setReplyIsFirstPost(true);
    } else if (response.status === "ok") {
      // TODO: response.message is the id of the comment that was created on the server
    }
  };

  // const commentAdded = (commentId: number, body: string, user: UserProfile) => {
  //   comments.pop(); // Remove last item from our local array
  //   // Replace it with this new comment at the start
  //   setComments([simulateNewComment(commentId, body, user), ...comments]);
  // };

  useEffect(() => {
    setLoading(true);
    getDiscussion(shortUrl, filters).then(json => {
      setLoading(false);
      setComments(json.discussion.comments);
      setPages(json.pages);
    });
  }, [filters, shortUrl]);

  useEffect(() => {
    setLoading(true);
    getCommentCount(shortUrl).then(json => {
      setLoading(false);
      setCommentCount(json.numberOfComments);
    });
  }, [shortUrl]);

  console.log("comments", comments);

  return (
    <div className={containerStyles}>
      {user && (
        <>
          {commentIsFirstPost && <FirstCommentWelcome />}
          <CommentForm
            shortUrl={shortUrl}
            user={user}
            submitComment={submitComment}
            error={commentError}
          />
        </>
      )}
      <TopPicks shortUrl={shortUrl} />
      <Filters
        filters={filters}
        setFilters={setFilters}
        pages={pages}
        commentCount={commentCount}
      />
      {loading ? (
        <p>TODO loading component goes here...</p>
      ) : (
        <CommentList
          comments={comments}
          shortUrl={shortUrl}
          user={user}
          replyError={replyError}
          replyIsFirstPost={replyIsFirstPost}
          submitComment={submitReply}
        />
      )}
      <footer className={footerStyles}>
        <Pagination
          pages={pages}
          page={filters.page}
          setPage={(page: number) => {
            setFilters({
              ...filters,
              page: page
            });
          }}
          commentCount={commentCount}
          filters={filters}
        />
      </footer>
    </div>
  );
};
