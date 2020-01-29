import React, { useState, useEffect, useReducer } from "react";
import { css } from "emotion";
import createPersistedState from "use-persisted-state";

import { getDiscussion, DiscussionResponse, preview, comment } from "./api";

import { Filters, defaultFilterOptions } from "./Filters";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { UserDetails } from "./UserDetails";
import { Pick } from "./Pick";

import { Pillar } from "./types";
import { reducer } from "./reducer";

const pillar: Pillar = "sport";
const shortURL = "/p/3htd7";

// CSS

const leftCol = css`
  float: left;
  width: 25%;
`;
const rightCol = css`
  float: right;
  width: 75%;
`;

const initialState = { shortURL: "/p/3htd7", filters: defaultFilterOptions };

const App: React.FC<{ initDiscussion?: DiscussionResponse }> = ({}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*   // STATE AND UPDATE
  const useFilterState = createPersistedState("discussion-filters");
  const [filters, setFilters] = useFilterState(defaultFilterOptions); */

  // TODO configure in UI later on (for nice DX)
  useEffect(() => {
    const discussion = getDiscussion(state.shortURL, state.filters);
    discussion.then(json =>
      dispatch({ type: "SET_DISCUSSION", discussion: json })
    );
  }, [state.filters]);

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

  const postComment = (body: string) => {
    comment(shortURL, body);
  };

  // APP

  if (!state.discussion) {
    return null;
  }

  const comments = state.discussion.discussion.comments;

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
          postComment={postComment}
          body={body}
          showPreview={showPreview}
        />

        {/* All Picks */}
        <div>
          {/* Single Pick */}
          <Pick />
        </div>

        {/* Filter bar */}
        <Filters filters={state.filters} dispatch={dispatch} />

        {/* Comments */}
        {comments.map(comment => (
          <Comment comment={comment} pillar={pillar} />
        ))}
      </div>
    </div>
  );
};

export default App;
