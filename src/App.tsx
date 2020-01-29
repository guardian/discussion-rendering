import React, { useState, useEffect } from "react";
import { css } from "emotion";
import createPersistedState from "use-persisted-state";

import { neutral, space } from "@guardian/src-foundations";

import {
  getDiscussion,
  DiscussionResponse,
  preview
} from "./api";

import { Filters, defaultFilterOptions } from './Filters';
import { Comment, avatar } from './Comment';
import { CommentForm } from './CommentForm';
import { UserDetails } from './UserDetails';

// CSS

const leftCol = css`
  float: left;
  width: 25%;
`;
const rightCol = css`
  float: right;
  width: 75%;
`;

const pick = css`
  width: 200px;
`;

const pickComment = css`
  padding: ${space[3]}px;
  background-color: ${neutral[97]};
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

const App: React.FC<{ initDiscussion?: DiscussionResponse }> = ({
  initDiscussion = undefined
}) => {

  // STATE AND UPDATE
  const [discussion, setDiscussion] = useState(initDiscussion);

  const useFilterState = createPersistedState("discussion-filters");
  const [filters, setFilters] = useFilterState(defaultFilterOptions);

  const discussionOptions = {
    orderBy: filters.orderBy,
    pageSize: filters.pageSize,
    displayThreaded: filters.threads !== "unthreaded",
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

  // APP

  if (!discussion) {
    return null;
  }

  const comments = discussion.discussion.comments;

  return (
    <div className="App">
      <div className={leftCol}>
        {/* User Details */}
        <UserDetails/>
      </div>
      <div className={rightCol}>
        {/* Comment Form */}
        <CommentForm setBody={setBody} previewBody={previewBody} requestPreview={requestPreview} body={body} showPreview={showPreview} />

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
