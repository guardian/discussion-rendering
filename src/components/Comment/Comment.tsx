import React, { useState } from "react";
import { css, cx } from "emotion";

import { space, palette } from "@guardian/src-foundations";
import { neutral, border } from "@guardian/src-foundations/palette";
import { textSans } from "@guardian/src-foundations/typography";
import { until, from } from "@guardian/src-foundations/mq";

import { Flex } from "../Flex/Flex";
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
          <Flex direction="row">
            <div className={cx(marginRight, flexGrow)}>
              <Avatar
                imageUrl={comment.userProfile.avatar}
                displayName={comment.userProfile.displayName}
                size={isReply ? "small" : "medium"}
              />
            </div>
            <Flex direction="column">
              <header>
                <Flex direction="row" justify="space-between" fullWidth={true}>
                  <Flex direction="column">
                    <Flex direction="row">
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
                    </Flex>
                    <Flex direction="row">
                      <Badges comment={comment} isHighlighted={isHighlighted} />
                    </Flex>
                  </Flex>
                  <>
                    {comment.status !== "blocked" && (
                      <RecommendationCount
                        commentId={comment.id}
                        initialCount={comment.numRecommends}
                        alreadyRecommended={false}
                      />
                    )}
                  </>
                </Flex>
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
            </Flex>
          </Flex>
        </div>

        {/* Mobile view */}
        <div
          className={css`
            ${from.mobileLandscape} {
              display: none;
            }
          `}
        >
          <Flex direction="row">
            {!isReply && (
              <div className={marginRight}>
                <Avatar
                  imageUrl={comment.userProfile.avatar}
                  displayName={comment.userProfile.displayName}
                  size="small"
                />
              </div>
            )}

            <Flex direction="row" justify="space-between" fullWidth={true}>
              <Flex direction="column">
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
              </Flex>
              <>
                {comment.status !== "blocked" && (
                  <RecommendationCount
                    commentId={comment.id}
                    initialCount={comment.numRecommends}
                    alreadyRecommended={false}
                  />
                )}
              </>
            </Flex>
          </Flex>
          <Flex direction="row">
            <Badges comment={comment} isHighlighted={isHighlighted} />
          </Flex>
          <Flex direction="column">
            <CommentMessage
              comment={comment}
              pillar={pillar}
              setCommentBeingRepliedTo={setCommentBeingRepliedTo}
              user={user}
              isHighlighted={isHighlighted}
              setIsHighlighted={setIsHighlighted}
              setError={setError}
            />
          </Flex>
        </div>
      </div>
    </>
  );
};
