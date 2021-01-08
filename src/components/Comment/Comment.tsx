import React, { useState } from 'react';
import { css, cx } from 'emotion';

import { space, palette, remSpace } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { neutral, border } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { Link } from '@guardian/src-link';
import { SvgIndent } from '@guardian/src-icons';

import { Pillar } from '@guardian/types/Format';

import { GuardianStaff, GuardianPick } from '../Badges/Badges';
import { RecommendationCount } from '../RecommendationCount/RecommendationCount';
import { AbuseReportForm } from '../AbuseReportForm/AbuseReportForm';
import { Timestamp } from '../Timestamp/Timestamp';
import { Avatar } from '../Avatar/Avatar';
import { Row } from '../Row/Row';
import { Column } from '../Column/Column';
import { ButtonLink } from '../ButtonLink/ButtonLink';

import { CommentType, UserProfile } from '../../types';
import { pickComment, unPickComment } from '../../lib/api';
import { createAuthenticationEventParams } from '../../lib/identity-component-event';
import { pillarToString } from '../../lib/pillarToString';

type Props = {
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
	onRecommend?: (commentId: number) => Promise<Boolean>;
};

const commentControlsLink = (pillar: Pillar) => css`
	margin-top: -2px;

	a {
		${textSans.small({ fontWeight: 'bold' })}
		margin-right: ${space[2]}px;
		color: ${palette[pillarToString(pillar)][400]};
		/*
      We do not want underline to be applied to SVG
      therefore we override the styles and apply them to the nested <span>
    */
		:hover {
			text-decoration: none;
			text-decoration-color: none;
			span {
				color: ${palette[pillarToString(pillar)][400]};
				text-decoration: underline;
				text-decoration-color: ${palette[pillarToString(pillar)][400]};
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
		color: ${palette[pillarToString(pillar)][400]};
		text-decoration-color: ${palette[pillarToString(pillar)][400]};
		:hover {
			color: ${palette[pillarToString(pillar)][400]};
			text-decoration-color: ${palette[pillarToString(pillar)][400]};
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

const svgReplyArrow = css`
	svg {
		fill: ${neutral[46]} !important;
	}
`;

const commentDetails = css`
	flex-grow: 1;
	width: 100%;
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

const cssTextOverflowElip = css`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const cssReplyToWrapper = css`
	${until.mobileLandscape} {
		padding-right: 10px;
		width: calc(100% - 35px);
		box-sizing: border-box;
	}
`;

// In order to show as much of the usernames as possible without fixed widths:
// - First label should shrink to contents but be no bigger than 60%
// - Second label should never force first label less than its contents if less than 60%
// - Second label should fill remaining space after above
// - Both labels should truncate with ellipsis if they fill their space
// Test page: https://codepen.io/gtrufitt/pen/LYGKQyY

const cssReplyAlphaDisplayName = css`
	${until.mobileLandscape} {
		${cssTextOverflowElip}
		width: 100%;
		max-width: fit-content;
	}
`;

const cssReplyBetaDisplayName = css`
	${until.mobileLandscape} {
		${cssTextOverflowElip}
		min-width: 40%;
		flex-grow: 1;
	}
`;

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
	<div
		className={css`
			width: ${space[amount]}px;
		`}
	/>
);

export const Comment = ({
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
	onRecommend,
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
		(obj) => obj['name'] === 'Staff',
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
						<div className={cssReplyToWrapper}>
							<Column>
								<div
									className={cx(
										comment.responseTo && hideBelowMobileLandscape,
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
												imageUrl={comment.userProfile.avatar}
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
													href={comment.userProfile.webUrl}
													subdued={true}
													rel="nofollow"
												>
													{comment.userProfile.displayName}
												</Link>
											</div>
											<Timestamp
												isoDateTime={comment.isoDateTime}
												webUrl={comment.webUrl}
												commentId={comment.id}
												onPermalinkClick={onPermalinkClick}
											/>
										</Column>
									</Row>
								</div>
								<div
									className={cx(
										!comment.responseTo && hideBelowMobileLandscape,
									)}
								>
									<Row>
										<div
											className={cx(
												colourStyles(pillar),
												boldFont,
												cssReplyAlphaDisplayName,
											)}
										>
											<Link
												href={comment.userProfile.webUrl}
												subdued={true}
												rel="nofollow"
											>
												{comment.userProfile.displayName}
											</Link>
										</div>
										{comment.responseTo ? (
											<div
												className={cx(
													colourStyles(pillar),
													regularFont,
													svgReplyArrow,
													cssReplyBetaDisplayName,
												)}
											>
												<Link
													href={`#comment-${comment.responseTo.commentId}`}
													subdued={true}
													icon={<SvgIndent />}
													iconSide="left"
													rel="nofollow"
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
												comment.responseTo && hideBelowMobileLandscape,
											)}
										>
											<Timestamp
												isoDateTime={comment.isoDateTime}
												webUrl={comment.webUrl}
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
						</div>
						{comment.status !== 'blocked' && (
							<RecommendationCount
								commentId={comment.id}
								initialCount={comment.numRecommends}
								alreadyRecommended={false}
								isSignedIn={!!user}
								onRecommend={onRecommend}
								userMadeComment={
									!!user && user.userId === comment.userProfile.userId
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
								<>All posts from this user have been muted on this device.</>
								<Space amount={1} />
								<ButtonLink
									onClick={() => toggleMuteStatus(comment.userProfile.userId)}
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
							className={cx(blockedCommentStyles, commentLinkStyling)}
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
								<Row>
									{/* When commenting is closed, no reply link shows at all */}
									{!isClosedForComments && (
										<>
											{/* If user is not logged in we link to the login page */}
											{user ? (
												<div className={svgReplyArrow}>
													<ButtonLink
														pillar={pillar}
														onClick={() => setCommentBeingRepliedTo(comment)}
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
														svgReplyArrow,
														commentControlsLink(pillar),
													)}
												>
													<Link
														href={`https://profile.theguardian.com/signin?returnUrl=${
															comment.webUrl
														}&${createAuthenticationEventParams(
															'signin_to_reply_comment',
														)}`}
														subdued={true}
														icon={<SvgIndent />}
														iconSide="left"
														rel="nofollow"
													>
														{/* We use this span to scope the styling */}
														<span data-link-name="reply to comment">Reply</span>
													</Link>
												</div>
											)}
											<Space amount={4} />
										</>
									)}
									<Space amount={4} />
									{/* Only staff can pick, and they cannot pick thier own comment */}
									{user &&
										user.badge.some((e) => e.name === 'Staff') &&
										user.userId !== comment.userProfile.userId && (
											<ButtonLink
												pillar={pillar}
												onClick={isHighlighted ? unPick : pick}
												linkName={
													isHighlighted ? 'unpick-comment' : 'pick-comment'
												}
											>
												{isHighlighted ? 'Unpick' : 'Pick'}
											</ButtonLink>
										)}
								</Row>
								<Row>
									{/* You can't mute unless logged in and you can't yourself */}
									{user && comment.userProfile.userId !== user.userId ? (
										<ButtonLink
											onClick={() =>
												toggleMuteStatus(comment.userProfile.userId)
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
												toggleSetShowForm={toggleSetShowForm}
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
