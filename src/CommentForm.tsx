import React from "react";
import { Button } from "@guardian/src-button";

export const CommentForm: React.FC<{
  setBody: React.Dispatch<string>;
  requestPreview: (body: string) => void;
  previewBody: string;
  showPreview: boolean;
  body: string;
}> = ({ setBody, requestPreview, previewBody, showPreview, body }) => {
  return (
    <>
      <form>
        <textarea
          placeholder="Join the discussion"
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
