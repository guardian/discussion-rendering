import React, { useState } from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { neutral, space, text } from '@guardian/src-foundations';
import { SvgIndent } from '@guardian/src-icons';

import { ButtonLink } from '../ButtonLink/ButtonLink';
import { Row } from '../Row/Row';

import { CommentType, Pillar } from '../../types';

type Props = {
    pillar: Pillar;
    commentBeingRepliedTo: CommentType;
};

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
    <div
        className={css`
            width: ${space[amount]}px;
        `}
    />
);

const indentStyles = css`
    width: 18px;
    svg {
        fill: ${neutral[46]} !important;
    }
`;

const smallFontStyles = css`
    ${textSans.small()};
    line-height: 19px;
`;

const replyPreviewHeaderStyle = css`
    ${textSans.small({ fontWeight: 'bold' })};
    margin-top: 0px;
    margin-bottom: ${space[2]}px;
`;

const arrowSize = 15;
const bg = neutral[93];
const previewStyle = css`
    padding-top: ${space[3]}px;
    padding-bottom: ${space[3]}px;
    padding-left: ${space[5]}px;
    padding-right: ${space[5]}px;
    background-color: ${bg};
    margin-top: ${arrowSize}px;
    margin-bottom: ${arrowSize + 5}px;
    position: relative;
    display: flex;
    flex-direction: column;
    :before {
        content: '';
        position: absolute;
        border-left: ${arrowSize}px solid ${bg};
        border-top: ${arrowSize}px solid transparent;
        top: -${arrowSize - 1}px;
        margin-left: ${space[9]}px;
    }
`;

const commentStyles = css`
    p {
        ${textSans.small()};
        margin-top: 0px;
        margin-bottom: ${space[3]}px;
    }
`;

const blueLink = css`
    color: ${text.anchorPrimary};
`;

export const CommentReplyPreview = ({
    pillar,
    commentBeingRepliedTo,
}: Props) => {
    const [displayReplyComment, setDisplayReplyComment] = useState<boolean>(
        false,
    );
    return (
        <>
            <Row>
                <div className={indentStyles}>
                    <SvgIndent />
                </div>
                <Space amount={1} />
                <div className={smallFontStyles}>
                    {commentBeingRepliedTo.userProfile.displayName}
                </div>
                <Space amount={3} />
                <ButtonLink
                    pillar={pillar}
                    onClick={() => setDisplayReplyComment(!displayReplyComment)}
                    linkName={
                        displayReplyComment
                            ? 'reply-comment-hide'
                            : 'reply-comment-show'
                    }
                >
                    {displayReplyComment ? 'Hide Comment' : 'Show comment'}
                </ButtonLink>
            </Row>
            {displayReplyComment && (
                <Preview
                    commentBeingRepliedTo={commentBeingRepliedTo}
                    setDisplayReplyComment={setDisplayReplyComment}
                    displayReplyComment={displayReplyComment}
                />
            )}
        </>
    );
};

export const Preview = ({
    commentBeingRepliedTo,
    setDisplayReplyComment,
    displayReplyComment,
}: {
    commentBeingRepliedTo: CommentType;
    setDisplayReplyComment: (displayReplyComment: boolean) => void;
    displayReplyComment: boolean;
}) => {
    return (
        <div className={previewStyle}>
            <p className={replyPreviewHeaderStyle}>
                {commentBeingRepliedTo.userProfile.displayName} @{' '}
                {commentBeingRepliedTo.date} said:
            </p>
            <div
                className={commentStyles}
                dangerouslySetInnerHTML={{
                    __html: commentBeingRepliedTo.body || '',
                }}
            />

            <ButtonLink
                onClick={() => setDisplayReplyComment(!displayReplyComment)}
                linkName="hide-comment"
            >
                <span className={blueLink}>Hide Comment</span>
            </ButtonLink>
        </div>
    );
};
