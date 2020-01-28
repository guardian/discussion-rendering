import React, { useState, useEffect, Dispatch } from "react";
import { css, cx } from "emotion";
import { neutral, space } from "@guardian/src-foundations";
import {
  getDiscussion,
  defaultDiscussionOptions,
  DiscussionResponse,
  Comment as CommentModel,
  DiscussionOptions,
  preview
} from "./api";
import createPersistedState from "use-persisted-state";

// CSS

const leftCol = css`
  float: left;
  width: 25%;
`;
const rightCol = css`
  float: right;
  width: 75%;
`;

const avatar = (avatarSize: number): string => css`
  border-radius: ${avatarSize}px;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
`;
const pick = css`
  width: 200px;
`;

const pickComment = css`
  padding: ${space[3]}px;
  background-color: ${neutral[97]};
`;

const filterBar = css`
  padding: ${space[3]}px 0;
  border-bottom: 1px solid ${neutral[97]};
  border-top: 1px solid ${neutral[97]};
  display: flex;
  list-style: none;

  li {
    flex: 1;
  }
`;

const commentControls = css`
  display: flex;

  li {
    flex: 1;
  }
`;

// Components
const TinyGu = () => (
  <>
    <svg width="36" height="36" viewBox="0 0 36 36">
      <path d="M18 0a18 18 0 1 0 0 36 18 18 0 0 0 0-36"></path>
      <path
        fill="#FFF"
        d="M21.2 4.4c2.3.4 5.3 2 6.3 3.1v5.2H27L21.2 5v-.6zm-2.2.4c-4 0-6.3 5.6-6.3 13.2 0 7.7 2.2 13.3 6.3 13.3v.6c-6 .4-14.4-4.2-14-13.8A13.3 13.3 0 0 1 19 4v.7zm10.4 14.4l-1.9.9v8.6c-1 1-3.8 2.6-6.3 3.1V19.9l-2.2-.7v-.6h10.4v.6z"
      ></path>
    </svg>
  </>
);

interface FilterOptions {
  orderBy: "newest" | "oldest" | "mostrecommended";
  pageSize: number;
  threads: "collapsed" | "expanded" | "unthreaded";
}

const defaultFilterOptions: FilterOptions = {
  orderBy: "newest",
  pageSize: 25,
  threads: "unthreaded"
};

const Filters: React.FC<{
  filters: FilterOptions;
  setFilters: React.Dispatch<FilterOptions>;
}> = ({ filters, setFilters }) => {
  return (
    <form>
      <label htmlFor="orderBy">Order by</label>
      <select
        name="orderBy"
        id="orderBy"
        onChange={
          e =>
            setFilters({
              ...filters,
              orderBy: e.target.value
            } as FilterOptions) // hacky
        }
        value={filters.orderBy}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="mostrecommended">Recommendations</option>
      </select>

      <label htmlFor="pageSize">Show</label>
      <select
        name="pageSize"
        id="pageSize"
        onChange={e =>
          setFilters({
            ...filters,
            pageSize: Number(e.target.value)
          } as FilterOptions)
        }
        value={filters.pageSize}
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <label htmlFor="threads">Threads</label>
      <select
        name="threads"
        id="threads"
        onChange={e =>
          setFilters({
            ...filters,
            threads: e.target.value
          } as FilterOptions)
        }
        value={filters.threads}
      >
        <option value="collapsed">Collapsed</option>
        <option value="expanded">Expanded</option>
        <option value="unthreaded">Unthreaded</option>
      </select>
    </form>
  );
};

const Comment: React.FC<{ comment: CommentModel }> = ({ comment }) => {
  return (
    <div
      className={css`
        border-bottom: 1px solid ${neutral[97]};
      `}
    >
      <img
        src={comment.userProfile.avatar}
        alt={comment.userProfile.displayName}
        className={cx(
          avatar(60),
          css`
            float: left;
          `
        )}
      />
      <p
        className={css`
          float: left;
        `}
      >
        {comment.userProfile.displayName}
      </p>
      <p
        className={css`
          display: block;
          clear: left;
        `}
      >
        {comment.body}
      </p>
      <p>{comment.numRecommends}</p>
      <div className={commentControls}>
        <li>reply</li>
        <li>share</li>
        <li>pick</li>
        <li>report</li>
      </div>
    </div>
  );
};

const App: React.FC<{ initDiscussion?: DiscussionResponse }> = ({
  initDiscussion = undefined
}) => {
  const [discussion, setDiscussion] = useState(initDiscussion);

  const useFilterState = createPersistedState("discussion-filters");
  const [filters, setFilters] = useFilterState(defaultFilterOptions);

  const discussionOptions = {
    orderBy: filters.orderBy,
    pageSize: filters.pageSize,
    displayThreaded: filters.threads != "unthreaded",
    maxResponses: 3
  };

  // TODO configure in UI later on (for nice DX)
  useEffect(() => {
    const discussion = getDiscussion("/p/3htd7", discussionOptions);
    discussion.then(json => setDiscussion(json));
  }, [filters]);

  const [body, setBody] = useState("");
  const [previewBody, setPreviewBody] = useState(body);
  const [showPreview, setShowPreview] = useState(false);

  const requestPreview = (body: string) => {
    preview(body)
      .then(text => {
        console.log("preview body is: " + text);
        setPreviewBody(text);
      })
      .then(() => setShowPreview(!showPreview));
  };

  if (!discussion) {
    return null;
  }

  const comments = discussion.discussion.comments;

  return (
    <div className="App">
      <div className={leftCol}>
        {/* User Details */}
        <img src="https://i.pravatar.cc/300" alt="" className={avatar(80)} />
        <p>
          You are signed in as <a href="">Username</a>
        </p>
      </div>
      <div className={rightCol}>
        {/* Comment Form */}
        <form>
          <textarea
            placeholder="Join the discussion"
            onChange={e => setBody(e.target.value)}
          ></textarea>
          <button
            onClick={e => {
              e.preventDefault();
              requestPreview(body);
            }}
          >
            Preview
          </button>
          <button type="submit">Post your comment</button>
        </form>

        {showPreview && <p>{previewBody}</p>}

        {/* All Picks */}
        <div>
          {/* Single Pick */}
          <div className={pick}>
            <div className={pickComment}>
              <h3>Guardian Pick</h3>
              <p>
                Comments on this piece are premoderated to ensure discussion
                remains on topics raised by the writer. Please be aware there
                may be a short delay in comments appearing on the site.
              </p>
              <a href="https://discussion.theguardian.com/comment-permalink/137730537">
                Jump to this comment
              </a>
            </div>
            <div>
              <img
                src="https://i.pravatar.cc/300?random"
                alt=""
                className={avatar(60)}
              />
              <p>Community Mod</p>
              <time>1 hr ago</time>
              <p>
                <TinyGu /> staff pick
              </p>
              <p>Commentvotes</p>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <Filters filters={filters} setFilters={setFilters} />

        {/* Comments */}
        {comments.map(comment => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default App;
