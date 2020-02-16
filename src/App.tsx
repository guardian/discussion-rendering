import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { CommentType, FilterOptions } from "./types";

import { getDiscussion } from "./lib/api";

import { CommentList } from "./components/CommentList/CommentList";
import { TopPicks } from "./components/TopPicks/TopPicks";
import { CommentForm } from "./components/CommentForm/CommentForm";
import { Filters, defaultFilterOptions } from "./components/Filters/Filters";

type Props = {
  shortUrl: string;
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const App = ({ shortUrl }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilterOptions);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<number>(0);

  const filtersUpdated = (filters: FilterOptions) => {
    setFilters(filters);
  };

  const simulateNewComment = (commentId: number, body: string) => {
    // The returned object below is a simulation of the comment that was created that
    // we add to our local state so that the reader has immediate feedback. We do
    // this because the api has a 1 minute cache expiry so simply refreshing the
    // main list of comments often won't return the comment just added.
    // Edge case: If the user _does_ refresh then this local state will be overridden
    // by the new api response and - if the refresh was within 60 seconds - the
    // reader's comment will not be present. The same edge case is present in frontend.
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
        userId: "TODO",
        displayName: "TODO",
        webUrl: "TODO",
        apiUrl: "TODO",
        avatar: "TODO",
        secureAvatarUrl: "TODO",
        badge: []
      }
    };
  };

  const commentAdded = (commentId: number, body: string) => {
    comments.pop(); // Remove last item from our local array
    // Replace it with this new comment at the start
    setComments([simulateNewComment(commentId, body), ...comments]);
  };

  useEffect(() => {
    setLoading(true);
    getDiscussion(shortUrl, filters).then(json => {
      setLoading(false);
      setComments(json.discussion.comments);
      setPages(json.pages);
    });
  }, [filters, shortUrl]);

  return (
    <div className={containerStyles}>
      <CommentForm shortUrl={shortUrl} onAdd={commentAdded} />
      <TopPicks shortUrl={shortUrl} />
      <Filters filters={filters} setFilters={filtersUpdated} pages={pages} />
      {loading ? (
        <p>TODO loading component goes here...</p>
      ) : (
        <CommentList comments={comments} />
      )}
      <CommentForm shortUrl={shortUrl} onAdd={commentAdded} />
    </div>
  );
};
