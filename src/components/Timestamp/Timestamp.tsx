import React, { useState } from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { dateFormatter } from '../../lib/dateFormatter';
import { useInterval } from '../../lib/useInterval';

type Props = {
	isoDateTime: string;
	webUrl: string;
	commentId: number;
	onPermalinkClick: (commentId: number) => void;
};

const linkStyles = css`
	color: ${palette.neutral[46]};
	text-decoration: none;
	:hover,
	:focus {
		text-decoration: underline;
	}
`;
const timeStyles = css`
	${textSans.xxsmall({ fontWeight: 'light' })}
	min-width: 0.75rem;
	margin-right: 0.3125rem;
	white-space: nowrap;
`;

export const Timestamp = ({
	isoDateTime,
	webUrl,
	commentId,
	onPermalinkClick,
}: Props) => {
	let [timeAgo, setTimeAgo] = useState(dateFormatter(isoDateTime));

	useInterval(() => {
		setTimeAgo(dateFormatter(isoDateTime));
	}, 15000);

	return (
		<a
			href={webUrl}
			className={linkStyles}
			data-link-name="jump-to-comment-timestamp"
			onClick={(e) => {
				onPermalinkClick(commentId);
				e.preventDefault();
			}}
			rel="nofollow"
		>
			<time dateTime={isoDateTime.toString()} className={timeStyles}>
				{timeAgo}
			</time>
		</a>
	);
};
