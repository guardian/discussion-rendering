import React, { useState, useEffect } from 'react';
import { css, cx } from 'emotion';

import { space, neutral, palette, border } from '@guardian/src-foundations';
import { SvgPlus } from '@guardian/src-icons';

import {
	Pillar,
	CommentType,
	UserProfile,
	ThreadsType,
	CommentResponse,
} from '../../types';
import { CommentForm } from '../CommentForm/CommentForm';
import { Comment } from '../Comment/Comment';
import { Row } from '../Row/Row';
import { CommentReplyPreview } from '../CommentReplyPreview/CommentReplyPreview';

import { getMoreResponses } from '../../lib/api';
import { pillarToString } from '../../lib/pillarToString';

type Props = {
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
	onPermalinkClick: (commentId: number) => void;
	onRecommend?: (commentId: number) => Promise<Boolean>;
	onComment?: (shortUrl: string, body: string) => Promise<CommentResponse>;
	onReply?: (
		shortUrl: string,
		body: string,
		parentCommentId: number,
	) => Promise<CommentResponse>;
	onPreview?: (body: string) => Promise<string>;
};

const nestingStyles = css`
	list-style-type: none;
	padding-left: ${space[2]}px;
	margin-left: ${space[12]}px;
`;

const buttonStyles = (pillar: Pillar) => css`
	margin-top: 12px;
	margin-bottom: 12px;
	cursor: pointer;
	background: ${neutral[100]};
	color: ${palette[pillarToString(pillar)][400]};
	height: 24px;
	font-size: 12px;
	font-weight: bold;
	text-overflow: ellipsis;
	border-radius: 12px;

	border: 1px solid ${neutral[86]};
	svg {
		fill: ${neutral[60]};
		width: 15px;
		height: 15px;
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

export const CommentContainer = ({
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
	onPermalinkClick,
	onRecommend,
	onComment,
	onReply,
	onPreview,
}: Props) => {
	// Filter logic
	const [expanded, setExpanded] = useState<boolean>(threads === 'expanded');
	const [responses, setResponses] = useState(comment.responses || []);
	const [loading, setLoading] = useState<boolean>(false);

	const showResponses = threads !== 'unthreaded';

	const decideShowMoreText = () => {
		const remainingResponses =
			comment.metaData?.responseCount && comment.metaData?.responseCount - 3;
		if (remainingResponses === 1) return `Show 1 more reply`;
		return `Show ${remainingResponses} more replies`;
	};

	useEffect(() => {
		setResponses(comment.responses || []);
	}, [comment]);

	const expand = (commentId: number) => {
		setLoading(true);
		getMoreResponses(commentId)
			.then((json) => {
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
				comment={comment}
				pillar={pillar}
				isClosedForComments={isClosedForComments}
				setCommentBeingRepliedTo={setCommentBeingRepliedTo}
				user={user}
				isReply={false}
				isMuted={mutes.includes(comment.userProfile.userId)}
				toggleMuteStatus={toggleMuteStatus}
				onPermalinkClick={onPermalinkClick}
				onRecommend={onRecommend}
			/>

			<>
				{showResponses && responses && (
					<div className={nestingStyles}>
						<ul className={cx(commentContainerStyles, removeMargin)}>
							{responses.map((responseComment) => (
								<li key={responseComment.id}>
									<Comment
										comment={responseComment}
										pillar={pillar}
										isClosedForComments={isClosedForComments}
										setCommentBeingRepliedTo={setCommentBeingRepliedTo}
										user={user}
										isReply={true}
										wasScrolledTo={commentToScrollTo === responseComment.id}
										isMuted={mutes.includes(responseComment.userProfile.userId)}
										toggleMuteStatus={toggleMuteStatus}
										onPermalinkClick={onPermalinkClick}
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
										data-link-name="Show more replies"
									>
										<Row>
											<SvgPlus />
											<span
												className={css`
													margin-left: 4px;
												`}
											>
												{loading ? 'loading...' : decideShowMoreText()}
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
						<div
							id={`comment-reply-form-${commentBeingRepliedTo.id}`}
							className={nestingStyles}
						>
							<CommentReplyPreview
								pillar={pillar}
								commentBeingRepliedTo={commentBeingRepliedTo}
							/>
							<CommentForm
								shortUrl={shortUrl}
								pillar={pillar}
								onAddComment={(response) =>
									setResponses([...responses, response])
								}
								user={user}
								setCommentBeingRepliedTo={setCommentBeingRepliedTo}
								commentBeingRepliedTo={commentBeingRepliedTo}
								onComment={onComment}
								onReply={onReply}
								onPreview={onPreview}
							/>
						</div>
					)}
			</>
		</div>
	);
};
