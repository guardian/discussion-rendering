import React, { useState } from "react";
import { css, cx } from "emotion";

import { space, palette } from "@guardian/src-foundations";
import { neutral, border } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import { until, from } from "@guardian/src-foundations/mq";

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
  wasScrolledTo?: boolean;
};

const commentWrapper = css`
  border-top: 1px solid ${border.secondary};
  display: flex;
  padding: ${space[2]}px 0;
`;

const selectedStyles = css`
  background-color: ${neutral[97]};
  margin-left: -${space[2]}px;
  padding-left: ${space[2]}px;
  margin-right: -${space[2]}px;
  padding-right: ${space[2]}px;
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

const Column = ({
  children,
  justify = "flex-start",
  fullWidth = false
}: {
  children: JSX.Element | JSX.Element[];
  justify?: "flex-start" | "space-between"; // Extend as required
  fullWidth?: boolean;
}) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
      justify-content: ${justify};
      ${fullWidth} {
        width: 100%;
      }
    `}
  >
    {children}
  </div>
);

const Row = ({
  children,
  justify = "flex-start",
  fullWidth = false
}: {
  children: JSX.Element | JSX.Element[];
  justify?: "flex-start" | "space-between"; // Extend as required
  fullWidth?: boolean;
}) => (
  <div
    className={css`
      display: flex;
      flex-direction: row;
      justify-content: ${justify};
      ${fullWidth} {
        width: 100%;
      }
    `}
  >
    {children}
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
  isReply,
  wasScrolledTo
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
      <div
        id={`comment-${comment.id}`}
        className={cx(commentWrapper, wasScrolledTo && selectedStyles)}
      >
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
              <header>
                <Row justify="space-between" fullWidth={true}>
                  <Column>
                    <Row>
                      <div className={alignItemsCenter}>
                        <div className={marginRight}>
                          <div className={commentProfileName(pillar)}>
                            <a
                              href={joinUrl([
                                "https://profile.theguardian.com/user",
                                comment.userProfile.userId
                              ])}
                              className={linkStyles}
                            >
                              {comment.userProfile.displayName}
                            </a>
                          </div>
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
                      </div>
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
                </Row>
              </header>
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
            <>
              {!isReply && (
                <div className={marginRight}>
                  <Avatar
                    imageUrl={comment.userProfile.avatar}
                    displayName={comment.userProfile.displayName}
                    size="small"
                  />
                </div>
              )}
            </>

            <Row justify="space-between" fullWidth={true}>
              <Column>
                <div className={marginRight}>
                  <div className={commentProfileName(pillar)}>
                    <a
                      href={joinUrl([
                        "https://profile.theguardian.com/user",
                        comment.userProfile.userId
                      ])}
                      className={linkStyles}
                    >
                      {comment.userProfile.displayName}
                    </a>
                  </div>
                </div>
                <>
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
                </>
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
