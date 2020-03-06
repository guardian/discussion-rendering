import React from "react";
import { css, cx } from "emotion";

import { until, from } from "@guardian/src-foundations/mq";
import { space, neutral, palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { GuardianStaff } from "../Badges/Badges";
import { CommentType } from "../../types";
import { Avatar } from "../Avatar/Avatar";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { Timestamp } from "../Timestamp/Timestamp";

const pickStyles = css`
  width: 100%;
  min-width: 250px;
  margin-bottom: ${space[5]}px;
  flex: 0 0;
  ${textSans.small()};
`;

const arrowSize = 25;
const bg = neutral[93];

const pickComment = css`
  padding: ${space[3]}px;
  background-color: ${bg};
  border-radius: 15px;
  margin-bottom: ${arrowSize + 5}px;
  position: relative;

  ${from.tablet} {
    min-height: 150px;
  }

  :before {
    content: "";
    margin-left: 24px;
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

const userDetails = css`
  display: flex;
  justify-content: space-between;
`;

const userMetaStyles = css`
  display: flex;
  flex-direction: column;
`;

const userName = css`
  font-weight: bold;
  color: ${palette.news.main}; /* TODO USE PILLAR */
`;

const avatarMargin = css`
  margin-right: ${space[2]}px;
`;

const linkStyles = css`
  color: inherit;

  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const columWrapperStyles = css`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
const colLeft = css`
  padding-right: 10px;
`;
const colRight = css`
  padding-left: 10px;
`;

const picksWrapper = css`
  max-width: 620px;
  display: flex;
  flex-wrap: wrap;
`;

const twoColComments = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  ${until.tablet} {
    display: none;
  }
`;
const oneColComments = css`
  width: 100%;
  ${from.tablet} {
    display: none;
  }
`;

// TODO: Check if there are other labels
const TopPick = ({ comment }: { comment: CommentType }) => (
  <div className={pickStyles}>
    <div className={pickComment}>
      <h3
        className={css`
          ${textSans.small()};
          font-weight: bold;
          margin: 0px;
        `}
      >
        Guardian Pick
      </h3>
      <p dangerouslySetInnerHTML={{ __html: comment.body }}></p>
    </div>
    <div className={pickMetaWrapper}>
      <div className={userDetails}>
        <div className={avatarMargin}>
          <Avatar
            imageUrl={comment.userProfile.avatar}
            displayName={""}
            size="medium"
          />
        </div>
        <div className={cx("usermeta", userMetaStyles)}>
          <span className={userName}>
            <a
              href={`https://profile.theguardian.com/user/${comment.userProfile.userId}`}
              className={linkStyles}
            >
              {comment.userProfile.displayName}
            </a>
          </span>
          <Timestamp
            isoDateTime={comment.isoDateTime}
            linkTo={`https://discussion.theguardian.com/comment-permalink/${comment.id}`}
          />
          {comment.userProfile.badge.filter(obj => obj["name"] === "Staff") && (
            <GuardianStaff />
          )}
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

export const TopPicks = ({ comments }: { comments: Array<CommentType> }) => {
  const leftColComments: Array<CommentType> = [];
  const rightColComments: Array<CommentType> = [];
  comments.forEach((comment, index) =>
    index % 2 === 0
      ? leftColComments.push(comment)
      : rightColComments.push(comment)
  );
  return (
    <div className={picksWrapper}>
      <div className={twoColComments}>
        <div className={cx(columWrapperStyles, colLeft)}>
          {leftColComments.map(comment => (
            <TopPick comment={comment} />
          ))}
        </div>
        <div className={cx(columWrapperStyles, colRight)}>
          {rightColComments.map(comment => (
            <TopPick comment={comment} />
          ))}
        </div>
      </div>
      <div className={oneColComments}>
        {comments.map(comment => (
          <TopPick comment={comment} />
        ))}
      </div>
    </div>
  );
};
