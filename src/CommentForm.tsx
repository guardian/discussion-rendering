import React from "react";

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

      {showPreview && <p dangerouslySetInnerHTML={{ __html: previewBody }} />}
    </>
  );
};
