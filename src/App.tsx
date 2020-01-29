import React, { useState, useEffect, useReducer } from "react";
import { css } from "emotion";

import {
  getDiscussion,
  DiscussionResponse,
  preview,
  getPicks,
  comment
} from "./api";

import { Filters, defaultFilterOptions } from "./Filters";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { UserDetails } from "./UserDetails";
import { Pick } from "./Pick";

import { Pillar } from "./types";
import { reducer } from "./reducer";
import { headline } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";

const pillar: Pillar = "sport";

// CSS

const wrapper = css`
  margin: 20px auto 0;
  max-width: 600px;
`;

const initialState = {
  shortURL: "/p/3htd7",
  filters: defaultFilterOptions
};

const commentCountStyles = css`
  margin: 0;
  ${headline.xxsmall({ lineHeight: "regular", fontWeight: "bold" })};
`;

const countCountNumStyles = css`
  color: ${palette.neutral[46]};
`;

const App: React.FC<{ initDiscussion?: DiscussionResponse }> = ({}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // TODO configure in UI later on (for nice DX)
  useEffect(() => {
    const asyncStuff = async () => {
      const discussion = await getDiscussion(state.shortURL, state.filters);
      dispatch({ type: "SET_DISCUSSION", discussion });

      const staffPicks = await getPicks(state.shortURL);
      dispatch({ type: "SET_STAFF_PICKS", staffPicks });
    };

    asyncStuff();
  }, [state.filters]);

  // APP

  if (!state.discussion) {
    return null;
  }

  const comments = state.discussion.discussion.comments;

  return (
    <div className={wrapper}>
      <div className="">
        <h3 className={commentCountStyles}>
          comments{" "}
          <span className={countCountNumStyles}>
            ({state.discussion.discussion.commentCount})
          </span>
        </h3>
        {/* User Details */}
        <UserDetails />
      </div>
      <div className="">
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
          <Pick comments={state.staffPicks} />
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
