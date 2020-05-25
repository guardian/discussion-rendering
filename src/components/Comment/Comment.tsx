import React, { useState } from 'react';
import { css, cx } from 'emotion';

import { space, palette, remSpace } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { neutral, border } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { Link } from '@guardian/src-link';
import { SvgIndent } from '@guardian/src-svgs';

import { GuardianStaff, GuardianPick } from '../Badges/Badges';
import { RecommendationCount } from '../RecommendationCount/RecommendationCount';
import { AbuseReportForm } from '../AbuseReportForm/AbuseReportForm';
import { Timestamp } from '../Timestamp/Timestamp';
import { Avatar } from '../Avatar/Avatar';
import { Row } from '../Row/Row';
import { Column } from '../Column/Column';
import { ButtonLink } from '../ButtonLink/ButtonLink';

import { Pillar, CommentType, UserProfile } from '../../types';
import { pickComment, unPickComment } from '../../lib/api';
import { joinUrl } from '../../lib/joinUrl';

type Props = {
    baseUrl: string;
    user?: UserProfile;
    comment: CommentType;
    pillar: Pillar;
    isClosedForComments: boolean;
    setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void;
    isReply: boolean;
    wasScrolledTo?: boolean;
    isMuted: boolean;
    toggleMuteStatus: (userId: string) => void;
    onPermalinkClick: (commentId: number) => void;
};

const shiftLeft = css`
    margin-left: -${space[2]}px;
`;

const commentControlsLink = (pillar: Pillar) => css`
    margin-top: -2px;

    a {
    ${textSans.small({ fontWeight: 'bold' })}
    margin-right: ${space[2]}px;
    color: ${palette[pillar][400]};
    /*
      We do not want underline to be applied to SVG
      therefore we override the styles and apply them to the nested <span>
    */
    :hover {
      text-decoration: none;
      text-decoration-color: none;
      span {
        color: ${palette[pillar][400]};
        text-decoration: underline;
        text-decoration-color: ${palette[pillar][400]};
      }
    }
  }
`;

const spaceBetween = css`
    display: flex;
    justify-content: space-between;
`;

const commentCss = css`
  display: block;
  clear: left;
  ${textSans.small()}
  margin-top: ${remSpace[2]};
  margin-bottom: ${remSpace[3]};
  word-break: break-word;

  p {
    margin-top: 0;
    margin-bottom: ${space[3]}px;
  }

  blockquote {
    margin-top: ${space[3]}px;
    margin-bottom: ${space[3]}px;
    margin-left: ${space[5]}px;
    margin-right: ${space[5]}px;
    padding-left: ${space[2]}px;
    color: ${neutral[46]};
  }

  i {
      font-style: italic;
  }

  b {
      font-weight: bold;
  }

  code {
    font-family: monospace;
    font-size: 1em;
  }
  
`;

const blockedCommentStyles = css`
    color: ${neutral[46]};
    ${textSans.xsmall()}
`;

// to override a tag styles from dangerouslySetInnerHTML
const commentLinkStyling = css`
    a {
        color: ${palette.brand[500]};
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;

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

const avatarMargin = css`
    margin-right: ${space[2]}px;

    ${until.mobileLandscape} {
        display: none;
    }
`;

const colourStyles = (pillar: Pillar) => css`
    a {
        color: ${palette[pillar][400]};
        text-decoration-color: ${palette[pillar][400]};
        :hover {
            color: ${palette[pillar][400]};
            text-decoration-color: ${palette[pillar][400]};
        }
    }
`;

const boldFont = css`
    a {
        ${textSans.small({ fontWeight: 'bold' })}
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

const commentDetails = css`
    flex-grow: 1;
`;

const headerStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

const hideBelowMobileLandscape = css`
    ${until.mobileLandscape} {
        display: none;
    }
`;

const hideAboveMobileLandscape = css`
    ${from.mobileLandscape} {
        display: none;
    }
`;

const negativeMargin = css`
    margin-top: 0px;
    margin-bottom: -6px;
`;

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
    <div
        className={css`
            width: ${space[amount]}px;
        `}
    />
);

export const Comment = ({
    baseUrl,
    comment,
    pillar,
    isClosedForComments,
    setCommentBeingRepliedTo,
    user,
    isReply,
    wasScrolledTo,
    isMuted,
    toggleMuteStatus,
    onPermalinkClick,
}: Props) => {
    const [isHighlighted, setIsHighlighted] = useState<boolean>(
        comment.isHighlighted,
    );
    const [error, setError] = useState<string>();

    const [showAbuseReportForm, setAbuseReportForm] = useState(false);
    const toggleSetShowForm = () => setAbuseReportForm(!showAbuseReportForm);

    const pick = async () => {
        setError('');
        const response = await pickComment(comment.id);
        if (response.status === 'error') {
            setError(response.message);
        } else {
            setIsHighlighted(true);
        }
    };

    const unPick = async () => {
        setError('');
        const response = await unPickComment(comment.id);
        if (response.status === 'error') {
            setError(response.message);
        } else {
            setIsHighlighted(false);
        }
    };

    const showStaffbadge = comment.userProfile.badge.find(
        obj => obj['name'] === 'Staff',
    );

    const showPickBadge = comment.status !== 'blocked' && isHighlighted;

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
                data-testid={comment.id}
                className={cx(commentWrapper, wasScrolledTo && selectedStyles)}
            >
                <div className={cx(avatarMargin)}>
                    <Avatar
                        imageUrl={comment.userProfile.avatar}
                        displayName={comment.userProfile.displayName}
                        size={isReply ? 'small' : 'medium'}
                    />
                </div>

                <div className={commentDetails}>
                    <header className={headerStyles}>
                        <Column>
                            <div
                                className={cx(
                                    comment.responseTo &&
                                        hideBelowMobileLandscape,
                                    hideAboveMobileLandscape,
                                )}
                            >
                                <Row>
                                    <div
                                        className={css`
                                            margin-right: ${space[2]}px;
                                        `}
                                    >
                                        <Avatar
                                            imageUrl={
                                                comment.userProfile.avatar
                                            }
                                            displayName={''}
                                            size="small"
                                        />
                                    </div>
                                    <Column>
                                        <div
                                            className={cx(
                                                colourStyles(pillar),
                                                boldFont,
                                                negativeMargin,
                                            )}
                                        >
                                            <Link
                                                href={
                                                    comment.userProfile.webUrl
                                                }
                                                subdued={true}
                                            >
                                                {
                                                    comment.userProfile
                                                        .displayName
                                                }
                                            </Link>
                                        </div>
                                        <Timestamp
                                            isoDateTime={comment.isoDateTime}
                                            baseUrl={baseUrl}
                                            commentId={comment.id}
                                            onPermalinkClick={onPermalinkClick}
                                        />
                                    </Column>
                                </Row>
                            </div>
                            <div
                                className={cx(
                                    !comment.responseTo &&
                                        hideBelowMobileLandscape,
                                )}
                            >
                                <Row>
                                    <div
                                        className={cx(
                                            colourStyles(pillar),
                                            boldFont,
                                        )}
                                    >
                                        <Link
                                            href={comment.userProfile.webUrl}
                                            subdued={true}
                                        >
                                            {comment.userProfile.displayName}
                                        </Link>
                                    </div>
                                    {comment.responseTo ? (
                                        <div
                                            className={cx(
                                                colourStyles(pillar),
                                                regularFont,
                                                svgOverrides,
                                            )}
                                        >
                                            <Link
                                                href={`#comment-${comment.responseTo.commentId}`}
                                                subdued={true}
                                                icon={<SvgIndent />}
                                                iconSide="left"
                                            >
                                                {comment.responseTo.displayName}
                                            </Link>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div
                                        className={cx(
                                            timestampWrapperStyles,
                                            comment.responseTo &&
                                                hideBelowMobileLandscape,
                                        )}
                                    >
                                        <Timestamp
                                            isoDateTime={comment.isoDateTime}
                                            baseUrl={baseUrl}
                                            commentId={comment.id}
                                            onPermalinkClick={onPermalinkClick}
                                        />
                                    </div>
                                </Row>
                                <Row>
                                    {showStaffbadge ? (
                                        <div className={iconWrapper}>
                                            <GuardianStaff />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    {showPickBadge ? (
                                        <div className={iconWrapper}>
                                            <GuardianPick />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </Row>
                            </div>
                        </Column>
                        {comment.status !== 'blocked' && (
                            <RecommendationCount
                                commentId={comment.id}
                                initialCount={comment.numRecommends}
                                alreadyRecommended={false}
                                isSignedIn={!!user}
                                userMadeComment={
                                    !!user &&
                                    user.userId === comment.userProfile.userId
                                }
                            />
                        )}
                    </header>

                    <div
                        className={cx(
                            comment.responseTo && hideBelowMobileLandscape,
                            hideAboveMobileLandscape,
                        )}
                    >
                        <Row>
                            {showStaffbadge ? (
                                <div className={iconWrapper}>
                                    <GuardianStaff />
                                </div>
                            ) : (
                                <></>
                            )}
                            {showPickBadge ? (
                                <div className={iconWrapper}>
                                    <GuardianPick />
                                </div>
                            ) : (
                                <></>
                            )}
                        </Row>
                    </div>

                    {/* MUTED */}
                    {isMuted && (
                        <p className={blockedCommentStyles}>
                            <Row>
                                <>
                                    All posts from this user have been muted on
                                    this device.
                                </>
                                <Space amount={1} />
                                <ButtonLink
                                    onClick={() =>
                                        toggleMuteStatus(
                                            comment.userProfile.userId,
                                        )
                                    }
                                    linkName="unmute-user"
                                    size="small"
                                >
                                    Unmute?
                                </ButtonLink>
                            </Row>
                        </p>
                    )}

                    {/* BLOCKED */}
                    {!isMuted && comment.status === 'blocked' && (
                        <p
                            className={cx(
                                blockedCommentStyles,
                                commentLinkStyling,
                            )}
                            dangerouslySetInnerHTML={{ __html: comment.body }}
                        />
                    )}

                    {/* NORMAL */}
                    {!isMuted && comment.status !== 'blocked' && (
                        <>
                            <div
                                className={cx(commentCss, commentLinkStyling)}
                                dangerouslySetInnerHTML={{
                                    __html: comment.body,
                                }}
                            />
                            <div className={spaceBetween}>
                                <div className={shiftLeft}>
                                    <Row>
                                        {/* When commenting is closed, no reply link shows at all */}
                                        {!isClosedForComments && (
                                            <>
                                                {/* If user is not logged in we link to the login page */}
                                                {user ? (
                                                    <div
                                                        className={svgOverrides}
                                                    >
                                                        <ButtonLink
                                                            pillar={pillar}
                                                            onClick={() =>
                                                                setCommentBeingRepliedTo(
                                                                    comment,
                                                                )
                                                            }
                                                            icon={<SvgIndent />}
                                                            iconSide="left"
                                                            linkName="reply to comment"
                                                        >
                                                            Reply
                                                        </ButtonLink>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={cx(
                                                            svgOverrides,
                                                            commentControlsLink(
                                                                pillar,
                                                            ),
                                                        )}
                                                    >
                                                        <Link
                                                            href={`https://profile.theguardian.com/signin?returnUrl=https://discussion.theguardian.com/comment-permalink/${comment.id}`}
                                                            subdued={true}
                                                            icon={<SvgIndent />}
                                                            iconSide="left"
                                                        >
                                                            {/* We use this span to scope the styling */}
                                                            <span data-link-name="reply to comment">
                                                                Reply
                                                            </span>
                                                        </Link>
                                                    </div>
                                                )}
                                                <Space amount={4} />
                                            </>
                                        )}
                                        <Space amount={4} />
                                        {/* Only staff can pick, and they cannot pick thier own comment */}
                                        {user &&
                                            user.badge.some(
                                                e => e.name === 'Staff',
                                            ) &&
                                            user.userId !==
                                                comment.userProfile.userId && (
                                                <ButtonLink
                                                    pillar={pillar}
                                                    onClick={
                                                        isHighlighted
                                                            ? unPick
                                                            : pick
                                                    }
                                                    linkName={
                                                        isHighlighted
                                                            ? 'unpick-comment'
                                                            : 'pick-comment'
                                                    }
                                                >
                                                    {isHighlighted
                                                        ? 'Unpick'
                                                        : 'Pick'}
                                                </ButtonLink>
                                            )}
                                    </Row>
                                </div>
                                <Row>
                                    {/* You can't mute unless logged in and you can't yourself */}
                                    {user &&
                                    comment.userProfile.userId !==
                                        user.userId ? (
                                        <ButtonLink
                                            onClick={() =>
                                                toggleMuteStatus(
                                                    comment.userProfile.userId,
                                                )
                                            }
                                            size="small"
                                            linkName="mute-user"
                                        >
                                            Mute
                                        </ButtonLink>
                                    ) : (
                                        <></>
                                    )}
                                    <Space amount={4} />
                                    <ButtonLink
                                        size="small"
                                        onClick={toggleSetShowForm}
                                        linkName="Open report abuse"
                                    >
                                        Report
                                    </ButtonLink>
                                    {showAbuseReportForm && (
                                        <div
                                            className={css`
                                                position: relative;
                                            `}
                                        >
                                            <AbuseReportForm
                                                toggleSetShowForm={
                                                    toggleSetShowForm
                                                }
                                                pillar={pillar}
                                                commentId={comment.id}
                                            />
                                        </div>
                                    )}
                                </Row>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
