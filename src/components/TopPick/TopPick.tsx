import React from 'react';
import { css, cx } from 'emotion';

import { from } from '@guardian/src-foundations/mq';
import { space, neutral, palette } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Link } from '@guardian/src-link';
import { brand } from '@guardian/src-foundations/palette';

import { GuardianStaff } from '../Badges/Badges';
import { CommentType, Pillar } from '../../types';
import { Avatar } from '../Avatar/Avatar';
import { RecommendationCount } from '../RecommendationCount/RecommendationCount';
import { Timestamp } from '../Timestamp/Timestamp';
import { Row } from '../Row/Row';
import { Column } from '../Column/Column';

type Props = {
    pillar: Pillar;
    comment: CommentType;
    isSignedIn: boolean;
    userMadeComment: boolean;
    onPermalinkClick: (commentId: number) => void;
};

const pickStyles = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 250px;
    margin-bottom: ${space[5]}px;
    ${textSans.small()};

    blockquote {
        margin-top: ${space[3]}px;
        margin-bottom: ${space[3]}px;
        margin-left: ${space[5]}px;
        margin-right: ${space[5]}px;
        padding-left: ${space[2]}px;
        color: ${neutral[46]};
    }
`;

const arrowSize = 25;
const bg = neutral[93];

const userNameStyles = (pillar: Pillar) => css`
    margin-top: 3px;
    margin-bottom: -6px;
    font-weight: bold;
    color: ${palette[pillar][400]};
`;

const avatarMargin = css`
    margin-right: ${space[2]}px;
`;

const smallFontSize = css`
    a {
        ${textSans.small()}
    }
`;

const linkStyles = css`
    text-decoration: none;
    :hover {
        text-decoration: underline;
    }
`;

// to override a tag styles from dangerouslySetInnerHTML
const inCommentLinkStyling = css`
    a {
        color: ${brand[500]};
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;

const titleStyles = css`
    ${textSans.small()};
    font-weight: bold;
    margin: 0px;
    margin-bottom: ${space[1]}px;
`;

const inheritColour = css`
    color: inherit;
`;

const wrapStyles = css`
    word-break: break-word;
`;

const PickBubble = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            padding: ${space[3]}px;
            background-color: ${bg};
            border-radius: 15px;
            margin-bottom: ${arrowSize + 5}px;
            position: relative;

            ${from.tablet} {
                min-height: 150px;
            }

            :before {
                content: '';
                margin-left: ${space[6]}px;
                position: absolute;
                border-right: ${arrowSize}px solid transparent;
                border-top: ${arrowSize}px solid ${bg};
                bottom: -${arrowSize - 1}px;
            }

            p {
                margin-top: 0;
                margin-bottom: ${space[3]}px;
            }
        `}
    >
        {children}
    </div>
);

const Top = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div>{children}</div>
);

const Bottom = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div>{children}</div>
);

const PickMeta = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div
        className={css`
            display: flex;
            justify-content: space-between;
            padding-top: ${space[1]}px;
        `}
    >
        {children}
    </div>
);

const truncateText = (input: string, limit: number) => {
    // If input greater than limit trucate by limit and append an ellipsis
    if (input.length > limit) return input.substr(0, limit) + '&#8230;';
    return input;
};

export const TopPick = ({
    pillar,
    comment,
    isSignedIn,
    userMadeComment,
    onPermalinkClick,
}: Props) => (
    <div className={pickStyles}>
        <PickBubble>
            <Top>
                <h3 className={titleStyles}>Guardian Pick</h3>
                <p
                    className={cx(wrapStyles, inCommentLinkStyling)}
                    dangerouslySetInnerHTML={{
                        __html: truncateText(comment.body, 450),
                    }}
                ></p>
            </Top>
            <Bottom>
                <div className={smallFontSize}>
                    <Link
                        priority="primary"
                        subdued={true}
                        href={comment.webUrl}
                        onClick={e => {
                            onPermalinkClick(comment.id);
                            e.preventDefault();
                        }}
                        rel="nofollow"
                    >
                        Jump to comment
                    </Link>
                </div>
            </Bottom>
        </PickBubble>
        <PickMeta>
            <Row>
                <div className={avatarMargin}>
                    <Avatar
                        imageUrl={comment.userProfile.avatar}
                        displayName={''}
                        size="medium"
                    />
                </div>
                <Column>
                    <span className={userNameStyles(pillar)}>
                        <a
                            href={comment.userProfile.webUrl}
                            className={cx(linkStyles, inheritColour)}
                            rel="nofollow"
                        >
                            {comment.userProfile.displayName}
                        </a>
                    </span>
                    <Timestamp
                        isoDateTime={comment.isoDateTime}
                        webUrl={comment.webUrl}
                        commentId={comment.id}
                        onPermalinkClick={onPermalinkClick}
                    />
                    {!!comment.userProfile.badge.filter(
                        obj => obj['name'] === 'Staff',
                    ).length ? (
                        <GuardianStaff />
                    ) : (
                        <></>
                    )}
                </Column>
            </Row>
            <RecommendationCount
                commentId={comment.id}
                initialCount={comment.numRecommends}
                alreadyRecommended={false}
                isSignedIn={isSignedIn}
                userMadeComment={userMadeComment}
            />
        </PickMeta>
    </div>
);
