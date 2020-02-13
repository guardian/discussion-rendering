import React from "react";
import { css, cx } from "emotion";
import { space, neutral } from "@guardian/src-foundations";
import { avatar } from "../Comment/Comment";
import { Comment as CommentModel } from "../../lib/api";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";

const pick = css`
  display: inline-block;
  position: relative;
  width: 100%;
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

const Pick = ({ comment }: { comment: CommentModel }) => (
  <div className={pick}>
    <div className={pickComment}>
      <p dangerouslySetInnerHTML={{ __html: comment.body }}></p>
    </div>
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        padding-top: ${space[2]}px;
      `}
    >
      <div>
        <img
          src={comment.userProfile.avatar}
          alt={""}
          className={cx(avatar(50), comment.userProfile.avatar)}
        />
        <p>{comment.userProfile.displayName}</p>
        <time>1 hr ago</time>
        <p>
          <TinyGu /> staff pick
        </p>
      </div>
      <div>
        <RecommendationCount
          commentId={comment.id}
          initialCount={comment.numRecommends}
          alreadyRecommended={false}
        />
      </div>
    </div>
  </div>
);

export const Picks = ({ comments }: { comments: CommentModel[] }) => {
  if (comments?.length === 0) {
    return <p>No picks.</p>;
  }

  return (
    <div
      className={css`
        column-count: 4;
        column-gap: 1em;
      `}
    >
      {comments.map(comment => (
        <Pick comment={comment} />
      ))}
    </div>
  );
};
