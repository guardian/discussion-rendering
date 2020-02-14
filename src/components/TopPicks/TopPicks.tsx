import React, { useState, useEffect } from "react";
import { css, cx } from "emotion";
import { space, neutral, palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { avatar } from "../Comment/Comment";
import { Comment as CommentModel, getPicks } from "../../lib/api";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { Timestamp } from "../Timestamp/Timestamp";

const picksWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const pick = css`
  max-width: 310px;
  min-width: 250px;
  margin-bottom: ${space[5]}px;
  flex: 0 0 49%;
  ${textSans.small()};
`;

const arrowSize = 15;
const bg = neutral[93];
const pickComment = css`
  padding: ${space[3]}px;
  background-color: ${bg};
  border-radius: 5px;
  margin-bottom: ${arrowSize + 5}px;
  min-height: 150px;
  position: relative;

  :before {
    content: "";
    position: absolute;
    border-right: ${arrowSize}px solid transparent;
    border-top: ${arrowSize}px solid ${bg};
    bottom: -${arrowSize - 1}px;
  }
`;

const pickMetaWrapper = css`
  display: flex;
  justify-content: space-between;
  padding-top: ${space[2]}px;
`;

const staffBadge = css``;

const staffIcon = css`
  display: inline-block;
  width: 15px;
  height: 15px;
`;

const staffLabel = css`
  display: inline-block;
  line-height: 15px;
  margin: 0 0 0 ${space[1]}px;
  ${textSans.xsmall()};
`;

const userDetails = css`
  width: 85%;
  display: flex;
  justify-content: space-between;
`;

const userName = css`
  font-weight: bold;
  color: ${palette.news.main}; /* TODO USE PILLAR */
`;

const picksAvatar = css`
  margin-right: ${space[3]}px;
`;

// Staff badge
// TODO: Are there other badges?
const GuStaff = () => (
  <div className={staffBadge}>
    <svg width="36" height="36" viewBox="0 0 36 36" className={staffIcon}>
      <path d="M18 0a18 18 0 1 0 0 36 18 18 0 0 0 0-36"></path>
      <path
        fill="#FFF"
        d="M21.2 4.4c2.3.4 5.3 2 6.3 3.1v5.2H27L21.2 5v-.6zm-2.2.4c-4 0-6.3 5.6-6.3 13.2 0 7.7 2.2 13.3 6.3 13.3v.6c-6 .4-14.4-4.2-14-13.8A13.3 13.3 0 0 1 19 4v.7zm10.4 14.4l-1.9.9v8.6c-1 1-3.8 2.6-6.3 3.1V19.9l-2.2-.7v-.6h10.4v.6z"
      ></path>
    </svg>
    <p className={staffLabel}>Staff</p>
  </div>
);

const Pick = ({ comment }: { comment: CommentModel }) => (
  <div className={pick}>
    <div className={pickComment}>
      <h3
        className={css`
          ${textSans.small()};
          font-weight: bold;
        `}
      >
        Guardian Pick
      </h3>
      <p dangerouslySetInnerHTML={{ __html: comment.body }}></p>
    </div>
    <div className={pickMetaWrapper}>
      <div className={userDetails}>
        <img
          src={comment.userProfile.avatar}
          alt={""}
          className={cx(avatar(50), comment.userProfile.avatar, picksAvatar)}
        />
        <div className="usermeta">
          <span className={userName}>{comment.userProfile.displayName}</span>
          <Timestamp isoDateTime={comment.isoDateTime} />

          {comment.userProfile.badge.filter(obj => obj["name"] === "Staff")
            .length > 0 && <GuStaff />}
        </div>
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

export const TopPicks = ({ shortUrl }: { shortUrl: string }) => {
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    getPicks(shortUrl).then(json => {
      setComments(json);
    });
  }, [shortUrl]);

  if (comments?.length === 0) {
    return <p>No picks.</p>;
  }

  return (
    <div className={picksWrapper}>
      {comments.map(comment => (
        <Pick comment={comment} />
      ))}
    </div>
  );
};
