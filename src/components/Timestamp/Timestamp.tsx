import React, { useState } from 'react';
import { css } from '@emotion/react';

import { textSans, neutral } from '@guardian/source-foundations';

import { useInterval } from '../../lib/useInterval';
import { timeAgo as timeAgoFormatter } from '@guardian/libs';

type Props = {
	isoDateTime: string;
	webUrl: string;
	commentId: number;
	onPermalinkClick: (commentId: number) => void;
};

const linkStyles = css`
	color: ${neutral[46]};
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
	const epoch = Date.parse(isoDateTime);
	const [timeAgo, setTimeAgo] = useState(timeAgoFormatter(epoch));

	useInterval(() => {
		setTimeAgo(timeAgoFormatter(epoch));
	}, 15000);

	return (
		<a
			href={webUrl}
			css={linkStyles}
			data-link-name="jump-to-comment-timestamp"
			onClick={(e) => {
				onPermalinkClick(commentId);
				e.preventDefault();
			}}
			rel="nofollow"
		>
			<time dateTime={isoDateTime.toString()} css={timeStyles}>
				{timeAgo}
			</time>
		</a>
	);
};
