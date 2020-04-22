import React, { useState } from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';

import { dateFormatter } from '../../lib/dateFormatter';
import { useInterval } from '../../lib/useInterval';
import { joinUrl } from '../../lib/joinUrl';

type Props = {
    isoDateTime: string;
    baseUrl: string;
    commentId: number;
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
    ${textSans.xsmall({ fontWeight: 'light' })}
    min-width: 0.75rem;
    margin-right: 0.3125rem;
`;

export const Timestamp = ({ isoDateTime, baseUrl, commentId }: Props) => {
    let [timeAgo, setTimeAgo] = useState(dateFormatter(isoDateTime));

    const linkTo = joinUrl([
        // Remove the discussion-api path from the baseUrl
        baseUrl
            .split('/')
            .filter(path => path !== 'discussion-api')
            .join('/'),
        'comment-permalink',
        commentId.toString(),
    ]);

    useInterval(() => {
        setTimeAgo(dateFormatter(isoDateTime));
    }, 15000);

    return (
        <a
            href={linkTo}
            className={linkStyles}
            data-link-name="jump-to-comment-timestamp"
        >
            <time dateTime={isoDateTime.toString()} className={timeStyles}>
                {timeAgo}
            </time>
        </a>
    );
};
