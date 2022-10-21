import { css } from '@emotion/react';
import { brand, neutral, textSans } from '@guardian/source-foundations';
import { SvgArrowUpStraight } from '@guardian/source-react-components';
import React, { useState } from 'react';
import { recommend as recommendDefault } from '../../lib/api';
import { Row } from '../Row/Row';

type Props = {
	commentId: number;
	initialCount: number;
	alreadyRecommended: boolean;
	isSignedIn: boolean;
	userMadeComment: boolean;
	onRecommend?: (commentId: number) => Promise<boolean>;
};

const countStyles = css`
	${textSans.xxsmall({ fontWeight: 'light' })}
	min-width: 0.75rem;
	color: ${neutral[46]};
	margin-right: 0.3125rem;
`;

const buttonStyles = (recommended: boolean, isSignedIn: boolean) => css`
	cursor: ${recommended || !isSignedIn ? 'default' : 'pointer'};
	width: 1.1875rem;
	height: 1.1875rem;
	background-color: ${recommended ? brand[400] : neutral[97]};
	border-radius: 62.5rem;
	border: none;
`;

const arrowStyles = (recommended: boolean) => css`
	display: flex;
	flex-direction: column;
	align-items: center;
	svg {
		fill: ${recommended ? neutral[100] : neutral[46]};
		height: 15px;
		width: 15px;
	}
`;

export const RecommendationCount = ({
	commentId,
	initialCount,
	alreadyRecommended,
	isSignedIn,
	userMadeComment,
	onRecommend,
}: Props) => {
	const [count, setCount] = useState(initialCount);
	const [recommended, setRecommended] = useState(alreadyRecommended);

	const tryToRecommend = () => {
		const newCount = count + 1;
		setCount(newCount);
		setRecommended(true);
		const recommend = onRecommend || recommendDefault;

		recommend(commentId).then((accepted) => {
			if (!accepted) {
				setCount(newCount - 1);
				setRecommended(alreadyRecommended);
			}
		});
	};

	return (
		<Row>
			<div css={countStyles}>{count}</div>
			<button
				css={buttonStyles(recommended, isSignedIn)}
				onClick={() => tryToRecommend()}
				disabled={recommended || !isSignedIn || userMadeComment}
				data-link-name="Recommend comment"
				aria-label="Recommend comment"
			>
				<div css={arrowStyles(recommended)}>
					<SvgArrowUpStraight />
				</div>
			</button>
		</Row>
	);
};
