import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { CommentType, FilterOptions, UserProfile } from "./types";
import { getDiscussion, getCommentCount } from "./lib/api";
import { CommentList } from "./components/CommentList/CommentList";
import { TopPicks } from "./components/TopPicks/TopPicks";
import { CommentForm } from "./components/CommentForm/CommentForm";
import { Filters } from "./components/Filters/Filters";
import { Pagination } from "./components/Pagination/Pagination";

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

const DEFAULT_FILTERS: FilterOptions = {
  orderBy: "newest",
  pageSize: 25,
  threads: "collapsed",
  page: 1
};

const rememberFilters = (filtersToRemember: FilterOptions) => {
  try {
    localStorage.setItem(
      "gu.prefs.discussioni.threading",
      JSON.stringify({ value: filtersToRemember.threads })
    );
    localStorage.setItem(
      "gu.prefs.discussioni.pagesize",
      JSON.stringify({ value: filtersToRemember.pageSize })
    );
    localStorage.setItem(
      "gu.prefs.discussioni.order",
      JSON.stringify({ value: filtersToRemember.orderBy })
    );
  } catch (error) {
    // Sometimes it's not possible to access localStorage, we accept this and don't want to
    // capture these errors
  }
};

const readFiltersFromLocalStorage = (): FilterOptions => {
  let threads;
  let pageSize;
  let orderBy;

  try {
    // Try to read from local storage
    orderBy = localStorage.getItem("gu.prefs.discussioni.order");
    threads = localStorage.getItem("gu.prefs.discussioni.threading");
    pageSize = localStorage.getItem("gu.prefs.discussioni.pagesize");
  } catch (error) {
    // Sometimes it's not possible to access localStorage, we accept this and don't want to
    // capture these errors
    return DEFAULT_FILTERS;
  }

  // If we found something in LS, use it, otherwise return defaults
  return {
    orderBy: orderBy ? JSON.parse(orderBy).value : DEFAULT_FILTERS.orderBy,
    threads: threads ? JSON.parse(threads).value : DEFAULT_FILTERS.threads,
    pageSize: pageSize ? JSON.parse(pageSize).value : DEFAULT_FILTERS.pageSize,
    page: DEFAULT_FILTERS.page
  };
};

export const App = ({ shortUrl, user }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(
    readFiltersFromLocalStorage()
  );
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

  const commentAdded = (commentId: number, body: string, user: UserProfile) => {
    comments.pop(); // Remove last item from our local array
    // Replace it with this new comment at the start
    setComments([simulateNewComment(commentId, body, user), ...comments]);
  };

  useEffect(() => {
    setLoading(true);
    getDiscussion(shortUrl, filters).then(json => {
      setLoading(false);
      setComments(json?.discussion?.comments);
      setPages(json?.pages);
    });
  }, [filters, shortUrl]);

  useEffect(() => {
    setLoading(true);
    getCommentCount(shortUrl).then(json => {
      setLoading(false);
      setCommentCount(json?.numberOfComments);
    });
  }, [shortUrl]);

  const onFilterChange = (newFilterObject: FilterOptions) => {
    rememberFilters(newFilterObject);
    setFilters(newFilterObject);
  };

  return (
    <div className={containerStyles}>
      {user && (
        <CommentForm shortUrl={shortUrl} onAdd={commentAdded} user={user} />
      )}
      <TopPicks shortUrl={shortUrl} />
      <Filters
        filters={filters}
        onFilterChange={onFilterChange}
        pages={pages}
        commentCount={commentCount}
      />
      {loading ? (
        <p>TODO loading component goes here...</p>
      ) : (
        <CommentList comments={comments} threads={filters.threads} />
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
