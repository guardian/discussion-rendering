import React, { useState, useEffect } from "react";
import { css } from "emotion";

import "regenerator-runtime/runtime";

import { Button } from "@guardian/src-button";
import { neutral, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import {
  CommentType,
  FilterOptions,
  UserProfile,
  AdditionalHeadersType,
  PageSizeType,
  OrderByType
} from "./types";
import {
  getDiscussion,
  getCommentCount,
  getPicks,
  initialiseApi
} from "./lib/api";
import { CommentContainer } from "./components/CommentContainer/CommentContainer";
import { TopPicks } from "./components/TopPicks/TopPicks";
import { CommentForm } from "./components/CommentForm/CommentForm";
import { Filters } from "./components/Filters/Filters";
import { Pagination } from "./components/Pagination/Pagination";

type Props = {
  shortUrl: string;
  baseUrl: string;
  initialPage?: number;
  pageSizeOverride?: PageSizeType;
  orderByOverride?: OrderByType;
  user?: UserProfile;
  additionalHeaders: AdditionalHeadersType;
  expanded: boolean;
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

const footerStyles = css`
  display: flex;
  justify-content: flex-end;
`;

const commentContainerStyles = css`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

const picksWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const viewMoreButtonContentStyles = css`
  display: flex;
  flex-direction: row;
  fill: ${neutral[86]};
`;

const DEFAULT_FILTERS: FilterOptions = {
  orderBy: "newest",
  pageSize: 25,
  threads: "collapsed"
};

const PlusSVG = () => (
  <svg width="18" height="18">
    <path d="M8.2 0h1.6l.4 7.8 7.8.4v1.6l-7.8.4-.4 7.8H8.2l-.4-7.8L0 9.8V8.2l7.8-.4.4-7.8z"></path>
  </svg>
);

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

const initialiseFilters = (
  pageSizeOverride?: PageSizeType,
  orderByOverride?: OrderByType
) => {
  const initialisedFilters = initFiltersFromLocalStorage();
  return {
    ...initialisedFilters,
    // Override if prop given
    pageSize: pageSizeOverride || initialisedFilters.pageSize,
    orderBy: orderByOverride || initialisedFilters.orderBy
  };
};

const initFiltersFromLocalStorage = (): FilterOptions => {
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
    pageSize: pageSize ? JSON.parse(pageSize).value : DEFAULT_FILTERS.pageSize
  };
};

export const App = ({
  baseUrl,
  shortUrl,
  initialPage,
  pageSizeOverride,
  orderByOverride,
  user,
  additionalHeaders,
  expanded
}: Props) => {
  const [filters, setFilters] = useState<FilterOptions>(
    initialiseFilters(pageSizeOverride, orderByOverride)
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(initialPage || 1);
  const [picks, setPicks] = useState<CommentType[]>([]);
  const [commentBeingRepliedTo, setCommentBeingRepliedTo] = useState<
    CommentType
  >();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    getDiscussion(shortUrl, { ...filters, page }).then(json => {
      setLoading(false);
      if (json?.status !== "error") {
        setComments(json?.discussion?.comments);
      }
      setTotalPages(json?.pages);
    });
  }, [filters, page, shortUrl]);

  useEffect(() => {
    setLoading(true);
    const fetchCommentCount = async () => {
      const json = await getCommentCount(shortUrl);
      setLoading(false);
      setCommentCount(json?.numberOfComments);
    };
    fetchCommentCount();
  }, [shortUrl]);

  useEffect(() => {
    const fetchPicks = async () => {
      const json = await getPicks(shortUrl);
      setPicks(json);
    };
    fetchPicks();
  }, [shortUrl]);

  // If these override props are updated we want to respect them
  useEffect(() => {
    setFilters(oldFilters => {
      return {
        ...oldFilters,
        orderBy: orderByOverride ? orderByOverride : oldFilters.orderBy,
        pageSize: pageSizeOverride ? pageSizeOverride : oldFilters.pageSize
      };
    });
  }, [pageSizeOverride, orderByOverride]);

  // Keep initialPage prop in sync with page
  useEffect(() => {
    if (initialPage) setPage(initialPage);
  }, [initialPage]);

  // Check the url to see if there is a hash ref to a comment and if
  // so, scroll to the div with this id.
  // We need to do this in javascript like this because the comments list isn't
  // loaded on the inital page load and only gets added to the dom later after
  // an api call is made.
  useEffect(() => {
    const commentIdFromUrl = () => {
      const { hash } = window.location;
      return hash && hash.includes("comment") && hash.split("-")[1];
    };

    const commentId = commentIdFromUrl();
    if (commentId) {
      const commentElement = document.getElementById(`comment-${commentId}`);
      commentElement && commentElement.scrollIntoView();
    }
  }, [comments]); // Add comments to deps so we rerun this effect when comments are loaded

  const onFilterChange = (newFilterObject: FilterOptions) => {
    rememberFilters(newFilterObject);
    setFilters(newFilterObject);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onAddComment = (commentId: number, body: string, user: UserProfile) => {
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
        isoDateTime: new Date().toISOString(),
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

    comments.pop(); // Remove last item from our local array
    // Replace it with this new comment at the start
    setComments([simulateNewComment(commentId, body, user), ...comments]);
  };

  initialiseApi({ additionalHeaders, baseUrl });

  const showPagination = totalPages > 1;

  if (!isExpanded) {
    return (
      <div className={commentContainerStyles}>
        {user && (
          <CommentForm
            shortUrl={shortUrl}
            onAddComment={onAddComment}
            user={user}
          />
        )}
        {picks && picks.length ? (
          <div className={picksWrapper}>
            {!!picks.length && (
              <TopPicks baseUrl={baseUrl} comments={picks.slice(0, 2)} />
            )}
          </div>
        ) : (
          <>
            {loading ? (
              <p>TODO loading component goes here...</p>
            ) : !comments.length ? (
              <p>TODO: No comment component goes here</p>
            ) : (
              <ul className={commentContainerStyles}>
                {comments.slice(0, 2).map(comment => (
                  <li key={comment.id}>
                    <CommentContainer
                      baseUrl={baseUrl}
                      comment={comment}
                      pillar="news"
                      shortUrl={shortUrl}
                      onAddComment={onAddComment}
                      user={user}
                      threads={filters.threads}
                      commentBeingRepliedTo={commentBeingRepliedTo}
                      setCommentBeingRepliedTo={setCommentBeingRepliedTo}
                    />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        <div
          className={css`
            width: 250px;
          `}
        >
          <Button size="small" onClick={() => setIsExpanded(true)}>
            <div className={viewMoreButtonContentStyles}>
              <PlusSVG />
            </div>
            <div
              className={css`
                ${textSans.small({ fontWeight: "bold" })}
                padding-left: ${space[1]}px;
              `}
            >
              View more comments
            </div>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      {user && (
        <CommentForm
          shortUrl={shortUrl}
          onAddComment={onAddComment}
          user={user}
        />
      )}
      {!!picks.length && <TopPicks baseUrl={baseUrl} comments={picks} />}
      <Filters
        filters={filters}
        onFilterChange={onFilterChange}
        totalPages={totalPages}
      />
      {showPagination && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={(newPage: number) => {
            onPageChange(newPage);
          }}
          commentCount={commentCount}
          filters={filters}
        />
      )}
      {loading ? (
        <p>TODO loading component goes here...</p>
      ) : !comments.length ? (
        <p>TODO: No comment component goes here</p>
      ) : (
        <ul className={commentContainerStyles}>
          {comments.map(comment => (
            <li key={comment.id}>
              <CommentContainer
                baseUrl={baseUrl}
                comment={comment}
                pillar="news"
                shortUrl={shortUrl}
                onAddComment={onAddComment}
                user={user}
                threads={filters.threads}
                commentBeingRepliedTo={commentBeingRepliedTo}
                setCommentBeingRepliedTo={setCommentBeingRepliedTo}
              />
            </li>
          ))}
        </ul>
      )}
      {showPagination && (
        <footer className={footerStyles}>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            setCurrentPage={(newPage: number) => {
              onPageChange(newPage);
            }}
            commentCount={commentCount}
            filters={filters}
          />
        </footer>
      )}
    </div>
  );
};
