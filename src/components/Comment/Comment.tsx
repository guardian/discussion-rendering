import React, { useState } from "react";
import { css, cx } from "emotion";

import { space, palette } from "@guardian/src-foundations";
import { border } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import { until, from } from "@guardian/src-foundations/mq";

import { Column } from "../Column/Column";
import { Row } from "../Row/Row";
import { CommentMessage } from "../CommentMessage/CommentMessage";
import { GuardianStaff, GuardianPick } from "../Badges/Badges";
import { RecommendationCount } from "../RecommendationCount/RecommendationCount";
import { Timestamp } from "../Timestamp/Timestamp";
import { Avatar } from "../Avatar/Avatar";

import { Pillar, CommentType, UserProfile } from "../../types";
import { joinUrl } from "../../lib/joinUrl";

type Props = {
  baseUrl: string;
  user?: UserProfile;
  comment: CommentType;
  pillar: Pillar;
  setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void;
  isReply: boolean;
};

const commentWrapper = css`
  border-top: 1px solid ${border.secondary};
  display: flex;
  padding: ${space[2]}px 0;
`;

const marginRight = css`
  margin-right: ${space[2]}px;
`;

const commentProfileName = (pillar: Pillar) => css`
  margin-top: 0;
  color: ${palette[pillar][400]};
  ${textSans.small({ fontWeight: "bold" })}
`;

const flexGrow = css`
  flex-grow: 1;
`;

const iconWrapper = css`
  padding: 2px;
  white-space: nowrap;
`;

const linkStyles = css`
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const alignItemsCenter = css`
  align-items: center;
`;

const fullWidthStyles = css`
  width: 100%;
`;

const spaceBetweenStyles = css`
  display: flex;
  justify-content: space-between;
`;

const headerStyles = css`
  justify-content: space-between;
`;

const ProfilName = ({
  pillar,
  userId,
  displayName
}: {
  pillar: Pillar;
  userId: string;
  displayName: string;
}) => (
  <div className={commentProfileName(pillar)}>
    <a
      href={joinUrl(["https://profile.theguardian.com/user", userId])}
      className={linkStyles}
    >
      {displayName}
    </a>
  </div>
);

const Badges = ({
  comment,
  isHighlighted
}: {
  comment: CommentType;
  isHighlighted: boolean;
}) => (
  <>
    <>
      {!!comment.userProfile.badge.filter(obj => obj["name"] === "Staff")
        .length && (
        <div className={iconWrapper}>
          <GuardianStaff />
        </div>
      )}
    </>
    <>
      {comment.status !== "blocked" && isHighlighted && (
        <div className={iconWrapper}>
          <GuardianPick />
        </div>
      )}
    </>
  </>
);

export const Comment = ({
  baseUrl,
  comment,
  pillar,
  setCommentBeingRepliedTo,
  user,
  isReply
}: Props) => {
  const [isHighlighted, setIsHighlighted] = useState<boolean>(
    comment.isHighlighted
  );
  const [error, setError] = useState<string>();

  return (
    <>
      {error && (
        <span
          className={css`
            color: red;
          `}
        >
          {error}
        </span>
      )}
      <div id={`comment-${comment.id}`} className={commentWrapper}>
        {/* Default view */}
        <div
          className={css`
            ${until.mobileLandscape} {
              display: none;
            }
          `}
        >
          <Row>
            <div className={cx(marginRight, flexGrow)}>
              <Avatar
                imageUrl={comment.userProfile.avatar}
                displayName={comment.userProfile.displayName}
                size={isReply ? "small" : "medium"}
              />
            </div>
            <Column>
              <Row>
                <header className={cx(headerStyles, fullWidthStyles)}>
                  <Column>
                    <Row className={alignItemsCenter}>
                      <div className={marginRight}>
                        <ProfilName
                          pillar={pillar}
                          userId={comment.userProfile.userId}
                          displayName={comment.userProfile.displayName}
                        />
                      </div>
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
                    </Row>
                    <Row>
                      <Badges comment={comment} isHighlighted={isHighlighted} />
                    </Row>
                  </Column>
                  <>
                    {comment.status !== "blocked" && (
                      <RecommendationCount
                        commentId={comment.id}
                        initialCount={comment.numRecommends}
                        alreadyRecommended={false}
                      />
                    )}
                  </>
                </header>
              </Row>
              <CommentMessage
                comment={comment}
                pillar={pillar}
                setCommentBeingRepliedTo={setCommentBeingRepliedTo}
                user={user}
                isHighlighted={isHighlighted}
                setIsHighlighted={setIsHighlighted}
                setError={setError}
              />
            </Column>
          </Row>
        </div>

        {/* Mobile view */}
        <div
          className={css`
            ${from.mobileLandscape} {
              display: none;
            }
          `}
        >
          <Row>
            {!isReply && (
              <div className={marginRight}>
                <Avatar
                  imageUrl={comment.userProfile.avatar}
                  displayName={comment.userProfile.displayName}
                  size="small"
                />
              </div>
            )}
            <Row className={cx(spaceBetweenStyles, fullWidthStyles)}>
              <Column>
                <ProfilName
                  pillar={pillar}
                  userId={comment.userProfile.userId}
                  displayName={comment.userProfile.displayName}
                />
                {!isReply && (
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
                )}
              </Column>
              <>
                {comment.status !== "blocked" && (
                  <RecommendationCount
                    commentId={comment.id}
                    initialCount={comment.numRecommends}
                    alreadyRecommended={false}
                  />
                )}
              </>
            </Row>
          </Row>
          <Row>
            <Badges comment={comment} isHighlighted={isHighlighted} />
          </Row>
          <Column>
            <CommentMessage
              comment={comment}
              pillar={pillar}
              setCommentBeingRepliedTo={setCommentBeingRepliedTo}
              user={user}
              isHighlighted={isHighlighted}
              setIsHighlighted={setIsHighlighted}
              setError={setError}
            />
          </Column>
        </div>
      </div>
    </>
  );
};
