import React, { useState } from "react";
import { css, cx } from "emotion";

import { space, palette } from "@guardian/src-foundations";
import { neutral, border } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import { until, from } from "@guardian/src-foundations/mq";
import { Link } from "@guardian/src-link";

import { ReplyArrow } from "../ReplyArrow/ReplyArrow";
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
  isClosedForComments: boolean;
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

const colourStyles = (pillar: Pillar) => css`
  color: ${palette[pillar][400]};
`;

const boldFont = css`
  a {
    ${textSans.small({ fontWeight: "bold" })}
  }
`;

const regularFont = css`
  a {
    ${textSans.small()}
  }
`;

const svgOverrides = css`
  svg {
    fill: ${neutral[46]} !important;
    left: 3px !important;
    bottom: 0 !important;
  }
`;

const flexGrow = css`
  flex-grow: 1;
`;

const iconWrapper = css`
  padding: 2px;
  white-space: nowrap;
`;

const timestampWrapperStyles = css`
  margin-left: ${space[2]}px;
  margin-bottom: -2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const linkStyles = css`
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const Column = ({
  children,
  justify = "flex-start",
  fullWidth = false,
  alignItems = "stretch"
}: {
  children: JSX.Element | JSX.Element[];
  justify?: "flex-start" | "space-between"; // Extend as required
  fullWidth?: boolean;
  alignItems?: "stretch" | "center" | "flex-start" | "flex-end";
}) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
      justify-content: ${justify};
      align-items: ${alignItems};
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
  fullWidth = false,
  alignItems = "stretch"
}: {
  children: JSX.Element | JSX.Element[];
  justify?: "flex-start" | "space-between"; // Extend as required
  fullWidth?: boolean;
  alignItems?: "stretch" | "center" | "flex-start" | "flex-end";
}) => (
  <div
    className={css`
      display: flex;
      flex-direction: row;
      justify-content: ${justify};
      align-items: ${alignItems};
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
  isClosedForComments,
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
            width: 100%;
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
                    <Row alignItems="center">
                      <div className={marginRight}>
                        <div className={cx(colourStyles(pillar), boldFont)}>
                          <Link
                            href={joinUrl([
                              "https://profile.theguardian.com/user",
                              comment.userProfile.userId
                            ])}
                            subdued={true}
                          >
                            {comment.userProfile.displayName}
                          </Link>
                        </div>
                      </div>
                      <>
                        {comment.responseTo && (
                          <div
                            className={cx(
                              colourStyles(pillar),
                              regularFont,
                              svgOverrides
                            )}
                          >
                            <Link
                              href={`#comment-${comment.responseTo.commentId}`}
                              subdued={true}
                              icon={<ReplyArrow />}
                              iconSide="left"
                            >
                              {comment.responseTo.displayName}
                            </Link>
                          </div>
                        )}
                      </>
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
            width: 100%;
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
                  <div className={cx(colourStyles(pillar), boldFont)}>
                    <Link
                      href={joinUrl([
                        "https://profile.theguardian.com/user",
                        comment.userProfile.userId
                      ])}
                      subdued={true}
                    >
                      {comment.userProfile.displayName}
                    </Link>
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
