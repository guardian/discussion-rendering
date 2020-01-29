import React, { useState, useEffect, useReducer } from "react";
import { css } from "emotion";

import { getDiscussion, DiscussionResponse, preview } from "./api";

import { Filters, defaultFilterOptions } from "./Filters";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { UserDetails } from "./UserDetails";
import { Pick } from "./Pick";

import { Pillar } from "./types";
import { reducer } from "./reducer";

const pillar: Pillar = "sport";

// CSS

const leftCol = css`
  float: left;
  width: 25%;
`;
const rightCol = css`
  float: right;
  width: 75%;
`;

const initialState = {
  shortURL: "/p/3htd7",
  filters: defaultFilterOptions
};

const App: React.FC<{ initDiscussion?: DiscussionResponse }> = ({}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // TODO configure in UI later on (for nice DX)
  useEffect(() => {
    const discussion = getDiscussion(state.shortURL, state.filters);
    discussion.then(json =>
      dispatch({ type: "SET_DISCUSSION", discussion: json })
    );
  }, [state.filters]);

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
          dispatch={dispatch}
          shortURL={state.shortURL}
          body={state.body}
          showPreview={state.showPreview}
          previewBody={state.previewBody}
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
