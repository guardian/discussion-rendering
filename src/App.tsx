import React, { useState, useEffect } from "react";
import { css } from "emotion";
import createPersistedState from "use-persisted-state";

import { getDiscussion, DiscussionResponse, preview } from "./api";

import { Filters, defaultFilterOptions } from "./Filters";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { UserDetails } from "./UserDetails";
import { Pick } from "./Pick";

// CSS

const leftCol = css`
  float: left;
  width: 25%;
`;
const rightCol = css`
  float: right;
  width: 75%;
`;

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
        <UserDetails />
      </div>
      <div className={rightCol}>
        {/* Comment Form */}
        <CommentForm
          setBody={setBody}
          previewBody={previewBody}
          requestPreview={requestPreview}
          body={body}
          showPreview={showPreview}
        />

        {/* All Picks */}
        <div>
          {/* Single Pick */}
          <Pick />
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
