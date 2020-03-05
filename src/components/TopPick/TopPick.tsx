import React from "react";
import { css } from "emotion";

import { space, neutral, palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { GuardianStaff } from "../Badges/Badges";
import { CommentType } from "../../types";
import { Avatar } from "../Avatar/Avatar";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { Timestamp } from "../Timestamp/Timestamp";

const pickStyles = css`
  max-width: 310px;
  min-width: 250px;
  margin-bottom: ${space[5]}px;
  flex: 0 0 49%;
  ${textSans.small()};
`;

const arrowSize = 25;
const bg = neutral[93];

const pickComment = css`
  padding: ${space[3]}px;
  background-color: ${bg};
  border-radius: 15px;
  margin-bottom: ${arrowSize + 5}px;
  min-height: 150px;
  position: relative;

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

// TODO: Check if there are other labels
export const TopPick = ({ pick }: { pick: CommentType }) => (
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
      <p dangerouslySetInnerHTML={{ __html: pick.body }}></p>
    </div>
    <div className={pickMetaWrapper}>
      <div className={userDetails}>
        <div className={avatarMargin}>
          <Avatar
            imageUrl={pick.userProfile.avatar}
            displayName={""}
            size="medium"
          />
        </div>
        <div className="usermeta">
          <span className={userName}>
            <a
              href={`https://profile.theguardian.com/user/${pick.userProfile.userId}`}
              className={linkStyles}
            >
              {pick.userProfile.displayName}
            </a>
          </span>
          <Timestamp
            isoDateTime={pick.isoDateTime}
            linkTo={`https://discussion.theguardian.com/comment-permalink/${pick.id}`}
          />
          {pick.userProfile.badge.filter(obj => obj["name"] === "Staff") && (
            <GuardianStaff />
          )}
        </div>
      </div>
      <div>
        <RecommendationCount
          commentId={pick.id}
          initialCount={pick.numRecommends}
          alreadyRecommended={false}
        />
      </div>
    </div>
  </div>
);
