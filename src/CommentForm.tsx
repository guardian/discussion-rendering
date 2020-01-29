import React from "react";
import { css } from "emotion";
import { Button } from "@guardian/src-button";
import { space } from "@guardian/src-foundations";

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

export const CommentForm: React.FC<{
  setBody: React.Dispatch<string>;
  requestPreview: (body: string) => void;
  postComment: (body: string) => void;
  previewBody: string;
  showPreview: boolean;
  body: string;
}> = ({
  setBody,
  requestPreview,
  postComment,
  previewBody,
  showPreview,
  body
}) => {
  return (
    <>
      <form
        className={commentForm}
        onSubmit={e => {
          e.preventDefault();
          postComment(body);
        }}
      >
        <textarea
          placeholder="Join the discussion"
          className={commentTextArea}
          onChange={e => setBody(e.target.value)}
        ></textarea>
        <Button
          size="small"
          onClick={e => {
            e.preventDefault();
            requestPreview(body);
          }}
        >
          Preview
        </Button>
        <Button type="submit" size="small">
          Post your comment
        </Button>
      </form>

      {showPreview && <p dangerouslySetInnerHTML={{ __html: previewBody }} />}
    </>
  );
};
