import React from 'react';
import { css, cx } from 'emotion';

import { until, from } from '@guardian/src-foundations/mq';
import { Pillar } from '@guardian/types';

import { CommentType, UserProfile } from '../../types';
import { TopPick } from '../TopPick/TopPick';

type Props = {
	pillar: Pillar;
	user?: UserProfile;
	comments: CommentType[];
	isSignedIn: boolean;
	onPermalinkClick: (commentId: number) => void;
	onRecommend?: (commentId: number) => Promise<Boolean>;
};

const columWrapperStyles = css`
	width: 50%;
	display: flex;
	flex-direction: column;
`;
const paddingRight = css`
	padding-right: 10px;
`;
const paddingLeft = css`
	padding-left: 10px;
`;

const picksWrapper = css`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const twoColCommentsStyles = css`
	width: 100%;
	display: flex;
	flex-direction: row;
	${until.tablet} {
		display: none;
	}
`;
const oneColCommentsStyles = css`
	width: 100%;
	${from.tablet} {
		display: none;
	}
`;

export const TopPicks = ({
	pillar,
	user,
	comments,
	isSignedIn,
	onPermalinkClick,
	onRecommend,
}: Props) => {
	const leftColComments: CommentType[] = [];
	const rightColComments: CommentType[] = [];
	comments.forEach((comment, index) =>
		index % 2 === 0
			? leftColComments.push(comment)
			: rightColComments.push(comment),
	);
	return (
		<div className={picksWrapper}>
			<div className={twoColCommentsStyles}>
				<div className={cx(columWrapperStyles, paddingRight)}>
					{leftColComments.map((comment) => (
						<TopPick
							key={comment.id}
							pillar={pillar}
							comment={comment}
							isSignedIn={isSignedIn}
							userMadeComment={
								!!user && user.userId === comment.userProfile.userId
							}
							onPermalinkClick={onPermalinkClick}
							onRecommend={onRecommend}
						/>
					))}
				</div>
				<div className={cx(columWrapperStyles, paddingLeft)}>
					{rightColComments.map((comment) => (
						<TopPick
							key={comment.id}
							pillar={pillar}
							comment={comment}
							isSignedIn={isSignedIn}
							userMadeComment={
								!!user && user.userId === comment.userProfile.userId
							}
							onPermalinkClick={onPermalinkClick}
							onRecommend={onRecommend}
						/>
					))}
				</div>
			</div>
			<div className={oneColCommentsStyles}>
				{comments.map((comment) => (
					<TopPick
						key={comment.id}
						pillar={pillar}
						comment={comment}
						isSignedIn={isSignedIn}
						userMadeComment={
							!!user && user.userId === comment.userProfile.userId
						}
						onPermalinkClick={onPermalinkClick}
						onRecommend={onRecommend}
					/>
				))}
			</div>
		</div>
	);
};
