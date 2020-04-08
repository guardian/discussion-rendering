import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import { space, neutral, palette, border } from '@guardian/src-foundations';

import { Pillar, CommentType, UserProfile, ThreadsType } from '../../types';
import { CommentForm } from '../CommentForm/CommentForm';
import { Comment } from '../Comment/Comment';
import { Row } from '../Row/Row';
import { CommentReplyPreview } from '../CommentReplyPreview/CommentReplyPreview';

import { getMoreResponses } from '../../lib/api';

type Props = {
    baseUrl: string;
    comment: CommentType;
    pillar: Pillar;
    isClosedForComments: boolean;
    shortUrl: string;
    user?: UserProfile;
    threads: ThreadsType;
    commentBeingRepliedTo?: CommentType;
    setCommentBeingRepliedTo: (commentBeingRepliedTo?: CommentType) => void;
    commentToScrollTo?: number;
    mutes: string[];
    toggleMuteStatus: (userId: string) => void;
};

const nestingStyles = css`
    list-style-type: none;
    padding-left: ${space[2]}px;
    margin-left: ${space[12] + 'px'};
`;

const buttonStyles = (pillar: Pillar) => css`
    margin-top: 12px;
    margin-bottom: 12px;
    cursor: pointer;
    background: ${neutral[100]};
    color: ${palette[pillar][400]};
    height: 24px;
    font-size: 12px;
    font-weight: bold;
    text-overflow: ellipsis;
    border-radius: 12px;

    border: 1px solid ${neutral[86]};
    svg {
        fill: ${neutral[60]};
    }

    :hover {
        border: 1px solid ${neutral[60]};
        svg {
            fill: ${neutral[46]};
        }
    }
`;

const topBorder = css`
    border-top: 1px solid ${border.secondary};
`;

const commentContainerStyles = css`
    list-style-type: none;
    padding-left: 0;
`;

const selectedStyles = css`
    background-color: ${neutral[97]};
    margin-left: -${space[2]}px;
    padding-left: ${space[2]}px;
    margin-right: -${space[2]}px;
    padding-right: ${space[2]}px;
`;

const removeMargin = css`
    margin: 0px;
`;

export const avatar = (avatarSize: number): string => css`
    border-radius: ${avatarSize + 10}px;
    width: ${avatarSize}px;
    height: ${avatarSize}px;
`;

const Plus = () => (
    <svg width="14" height="14" viewBox="0 0 18 18">
        <path d="M8.2 0h1.6l.4 7.8 7.8.4v1.6l-7.8.4-.4 7.8H8.2l-.4-7.8L0 9.8V8.2l7.8-.4.4-7.8z"></path>
    </svg>
);

export const CommentContainer = ({
    baseUrl,
    comment,
    pillar,
    isClosedForComments,
    user,
    shortUrl,
    threads,
    commentBeingRepliedTo,
    setCommentBeingRepliedTo,
    commentToScrollTo,
    mutes,
    toggleMuteStatus,
}: Props) => {
    // Filter logic
    const [expanded, setExpanded] = useState<boolean>(threads === 'expanded');
    const [responses, setResponses] = useState(comment.responses || []);
    const [loading, setLoading] = useState<boolean>(false);

    const showResponses = threads !== 'unthreaded';

    const decideShowMoreText = () => {
        const remainingResponses =
            comment.metaData?.responseCount &&
            comment.metaData?.responseCount - 3;
        if (remainingResponses === 1) return `Show 1 more reply`;
        return `Show ${remainingResponses} more replies`;
    };

    useEffect(() => {
        setResponses(comment.responses || []);
    }, [comment]);

    const expand = (commentId: number) => {
        setLoading(true);
        getMoreResponses(commentId)
            .then(json => {
                setExpanded(true);
                setResponses(json.comment.responses || []);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={cx(commentToScrollTo === comment.id && selectedStyles)}>
            <Comment
                baseUrl={baseUrl}
                comment={comment}
                pillar={pillar}
                isClosedForComments={isClosedForComments}
                setCommentBeingRepliedTo={setCommentBeingRepliedTo}
                user={user}
                isReply={false}
                isMuted={mutes.includes(comment.userProfile.userId)}
                toggleMuteStatus={toggleMuteStatus}
            />

            <>
                {showResponses && responses && (
                    <div className={nestingStyles}>
                        <ul
                            className={cx(commentContainerStyles, removeMargin)}
                        >
                            {responses.map(responseComment => (
                                <li key={responseComment.id}>
                                    <Comment
                                        baseUrl={baseUrl}
                                        comment={responseComment}
                                        pillar={pillar}
                                        isClosedForComments={
                                            isClosedForComments
                                        }
                                        setCommentBeingRepliedTo={
                                            setCommentBeingRepliedTo
                                        }
                                        user={user}
                                        isReply={true}
                                        wasScrolledTo={
                                            commentToScrollTo ===
                                            responseComment.id
                                        }
                                        isMuted={mutes.includes(
                                            responseComment.userProfile.userId,
                                        )}
                                        toggleMuteStatus={toggleMuteStatus}
                                    />
                                </li>
                            ))}
                        </ul>
                        {!expanded &&
                            comment.metaData?.responseCount &&
                            comment.metaData?.responseCount > 3 && (
                                <div className={topBorder}>
                                    <button
                                        onClick={() => expand(comment.id)}
                                        className={buttonStyles(pillar)}
                                    >
                                        <Row>
                                            <Plus />
                                            <span
                                                className={css`
                                                    margin-left: 4px;
                                                `}
                                            >
                                                {loading
                                                    ? 'loading...'
                                                    : decideShowMoreText()}
                                            </span>
                                        </Row>
                                    </button>
                                </div>
                            )}
                    </div>
                )}
                {commentBeingRepliedTo &&
                    (commentBeingRepliedTo.id === comment.id ||
                        responses.find(
                            (response: CommentType) =>
                                response.id === commentBeingRepliedTo.id,
                        )) &&
                    user && (
                        <div className={nestingStyles}>
                            <CommentReplyPreview
                                commentBeingRepliedTo={commentBeingRepliedTo}
                            />
                            <CommentForm
                                shortUrl={shortUrl}
                                pillar={pillar}
                                onAddComment={response =>
                                    setResponses([...responses, response])
                                }
                                user={user}
                                setCommentBeingRepliedTo={
                                    setCommentBeingRepliedTo
                                }
                                commentBeingRepliedTo={commentBeingRepliedTo}
                            />
                        </div>
                    )}
            </>
        </div>
    );
};
