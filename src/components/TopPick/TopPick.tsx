import React from "react";
import { css } from "emotion";

import { from } from "@guardian/src-foundations/mq";
import { space, neutral, palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { GuardianStaff } from "../Badges/Badges";
import { CommentType } from "../../types";
import { Avatar } from "../Avatar/Avatar";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { Timestamp } from "../Timestamp/Timestamp";
import { joinUrl } from "../../lib/joinUrl";

type Props = { baseUrl: string; comments: CommentType[] };

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

export const TopPick = ({
  baseUrl,
  comment
}: {
  baseUrl: string;
  comment: CommentType;
}) => (
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
        <div className={userMetaStyles}>
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
            linkTo={joinUrl([
              // Remove the discussion-api path from the baseUrl
              baseUrl
                .split("/")
                .filter(path => path !== "discussion-api")
                .join("/"),
              "comment-permalink",
              comment.id.toString()
            ])}
          />
          {!!comment.userProfile.badge.filter(obj => obj["name"] === "Staff")
            .length ? (
            <GuardianStaff />
          ) : (
            <></>
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
