import React from "react";
import { css } from "emotion";
import { Button } from "@guardian/src-button";
import { space, neutral } from "@guardian/src-foundations";
import { Action } from "../../lib/reducer";
import { comment, preview } from "../../lib/api";

const commentForm = css`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${space[5]}px;
`;

const commentTextArea = css`
  width: 100%;
  min-height: 120px;
  margin-bottom: ${space[3]}px;
`;

const arrowSize = 15;
const bg = neutral[93];
const previewStyle = css`
  padding: ${space[2]}px;
  background-color: ${bg};
  border-radius: 5px;
  margin-bottom: ${arrowSize + 5}px;
  position: relative;

  :before {
    content: "";
    position: absolute;
    border-right: ${arrowSize}px solid transparent;
    border-top: ${arrowSize}px solid ${bg};
    bottom: -${arrowSize - 1}px;
  }
`;

const postComment = (
  shortURL: string,
  body: string,
  dispatch: React.Dispatch<Action>
): Promise<void> => {
  if (!body) {
    return Promise.reject("body cannot be empty"); // TODO really this should be a dispatched event
  }

  return comment(shortURL, body).then(() =>
    dispatch({ type: "POST_COMMENT", body: body })
  );
};

const updateBody = (body: string, dispatch: React.Dispatch<Action>) => {
  console.log("BODY is: " + body);
  dispatch({ type: "SET_BODY", body: body });
};

const requestPreview = (
  body: string,
  dispatch: React.Dispatch<Action>,
  showPreview: boolean
) => {
  if (showPreview) {
    return dispatch({ type: "SET_SHOW_PREVIEW", showPreview: false });
  }

  return preview(body).then(previewBody =>
    dispatch({ type: "SET_PREVIEW", body: previewBody })
  );
};

export const CommentForm: React.FC<{
  dispatch: React.Dispatch<Action>;
  shortURL: string;
  body?: string;
  showPreview?: boolean;
  previewBody?: string;
}> = ({ dispatch, shortURL, body, showPreview, previewBody }) => {
  return (
    <>
      <form
        className={commentForm}
        onSubmit={e => {
          e.preventDefault();
          body && postComment(shortURL, body, dispatch);
        }}
      >
        <textarea
          placeholder="Join the discussion"
          className={commentTextArea}
          onChange={e => updateBody(e.target.value || "", dispatch)}
        ></textarea>
        <Button
          size="small"
          onClick={e => {
            e.preventDefault();
            body && requestPreview(body, dispatch, showPreview ?? false);
          }}
        >
          Preview
        </Button>
        <Button type="submit" size="small">
          Post your comment
        </Button>
      </form>

      {showPreview && (
        <p
          className={previewStyle}
          dangerouslySetInnerHTML={{ __html: previewBody || "" }}
        />
      )}
    </>
  );
};
