import { css } from '@emotion/react';

import { until, from } from '@guardian/source-foundations';
import { ArticleTheme } from '@guardian/libs';

import { CommentType, UserProfile } from '../../types';
import { TopPick } from '../TopPick/TopPick';

type Props = {
	pillar: ArticleTheme;
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
		<div css={picksWrapper}>
			<div css={twoColCommentsStyles}>
				<div css={[columWrapperStyles, paddingRight]}>
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
				<div css={[columWrapperStyles, paddingLeft]}>
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
			<div css={oneColCommentsStyles}>
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
