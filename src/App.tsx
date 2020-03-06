import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { Button } from "@guardian/src-button";
import { neutral } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";

import { CommentType, FilterOptions, UserProfile } from "./types";
import { getDiscussion, getCommentCount, getPicks } from "./lib/api";
import { CommentContainer } from "./components/CommentContainer/CommentContainer";
import { TopPick } from "./components/TopPick/TopPick";
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

const commentContainerStyles = css`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
`;

const picksWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const viewMoreButtonContentStyles = css`
  display: flex;
  flex-direction: row;
  ${textSans.medium({ fontWeight: "bold" })};
  fill: ${neutral[86]};
`;

const DEFAULT_FILTERS: FilterOptions = {
  orderBy: "newest",
  pageSize: 25,
  threads: "collapsed",
  page: 1
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
  const [filters, setFilters] = useState<FilterOptions>(
    readFiltersFromLocalStorage()
  );
  const [isPreview, setIsPreview] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [commentBeingRepliedTo, setCommentBeingRepliedTo] = useState<
    CommentType
  >();

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

  const [comments, setComments] = useState<CommentType[]>([]);

  const onAddComment = (commentId: number, body: string, user: UserProfile) => {
    comments.pop(); // Remove last item from our local array
    // Replace it with this new comment at the start
    setComments([simulateNewComment(commentId, body, user), ...comments]);
  };

  useEffect(() => {
    setLoading(true);
    getDiscussion(shortUrl, filters).then(json => {
      setLoading(false);
      setComments(json?.discussion?.comments);
      setTotalPages(json?.pages);
    });
  }, [filters, shortUrl]);

  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const fetchCommentCount = async () => {
      const json = await getCommentCount(shortUrl);
      setLoading(false);
      setCommentCount(json?.numberOfComments);
    };
    fetchCommentCount();
  }, [shortUrl]);

  const [picks, setPicks] = useState<CommentType[]>([]);
  useEffect(() => {
    const fetchPicks = async () => {
      const json = await getPicks(shortUrl);
      setPicks(json);
    };
    fetchPicks();
  }, [shortUrl]);

  const onFilterChange = (newFilterObject: FilterOptions) => {
    rememberFilters(newFilterObject);
    setFilters(newFilterObject);
  };

  const showPagination = totalPages > 1;

  if (isPreview) {
    return (
      <div className={commentContainerStyles}>
        {user && (
          <CommentForm
            shortUrl={shortUrl}
            onAddComment={onAddComment}
            user={user}
          />
        )}
        <div className={picksWrapper}>
          {picks && picks.length ? (
            <>
              {picks.slice(0, 2).map(pick => (
                <TopPick comment={pick} />
              ))}
            </>
          ) : (
            <>
              {comments.slice(0, 2).map(comment => (
                <CommentContainer
                  key={comment.id}
                  comment={comment}
                  pillar="news"
                  shortUrl={shortUrl}
                  onAddComment={onAddComment}
                  user={user}
                  threads={filters.threads}
                  commentBeingRepliedTo={commentBeingRepliedTo}
                  setCommentBeingRepliedTo={setCommentBeingRepliedTo}
                />
              ))}
            </>
          )}
        </div>
        <div
          className={css`
            width: 250px;
          `}
        >
          <Button size="small" onClick={() => setIsPreview(false)}>
            <div className={viewMoreButtonContentStyles}>
              <PlusSVG />
            </div>
            <div
              className={css`
                padding-left: 10px;
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
      {!!picks.length && (
        <div className={picksWrapper}>
          {picks.map(pick => (
            <TopPick comment={pick} />
          ))}
        </div>
      )}
      <Filters
        filters={filters}
        onFilterChange={onFilterChange}
        totalPages={totalPages}
      />
      {showPagination && (
        <Pagination
          totalPages={totalPages}
          currentPage={filters.page}
          setCurrentPage={(page: number) => {
            onFilterChange({
              ...filters,
              page
            });
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
        <div className={commentContainerStyles}>
          {comments.map(comment => (
            <CommentContainer
              key={comment.id}
              comment={comment}
              pillar="news"
              shortUrl={shortUrl}
              onAddComment={onAddComment}
              user={user}
              threads={filters.threads}
              commentBeingRepliedTo={commentBeingRepliedTo}
              setCommentBeingRepliedTo={setCommentBeingRepliedTo}
            />
          ))}
        </div>
      )}
      {showPagination && (
        <footer className={footerStyles}>
          <Pagination
            totalPages={totalPages}
            currentPage={filters.page}
            setCurrentPage={(page: number) => {
              setFilters({
                ...filters,
                page: page
              });
            }}
            commentCount={commentCount}
            filters={filters}
          />
        </footer>
      )}
    </div>
  );
};
