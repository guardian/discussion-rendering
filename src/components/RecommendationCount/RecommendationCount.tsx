import React, { useState } from 'react';
import { css } from 'emotion';

import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { brand } from '@guardian/src-foundations';

import { Row } from '../Row/Row';

import { recommend } from '../../lib/api';

type Props = {
    commentId: number;
    initialCount: number;
    alreadyRecommended: boolean;
    isSignedIn: boolean;
    userMadeComment: boolean;
};

const countStyles = css`
    ${textSans.xsmall({ fontWeight: 'light' })}
    min-width: 0.75rem;
    color: ${neutral[46]};
    margin-right: 0.3125rem;
`;

const ArrowUp = () => (
    <svg height="14" width="13">
        <path d="M.5 7l5.25-4.5V14h1.5V2.5L12.5 7l.5-1-5.75-6h-1.5L0 6l.5 1z"></path>
    </svg>
);

const buttonStyles = (recommended: boolean, isSignedIn: boolean) => css`
    cursor: ${recommended || !isSignedIn ? 'default' : 'pointer'};
    width: 1.1875rem;
    height: 1.1875rem;
    background-color: ${recommended ? brand[400] : neutral[97]};
    border-radius: 62.5rem;
    border: none;
`;

const arrowStyles = (recommended: Boolean) => css`
    margin-left: -4px;
    margin-bottom: -2px;
    svg {
        fill: ${recommended ? neutral[100] : neutral[46]};
    }
`;

export const RecommendationCount = ({
    commentId,
    initialCount,
    alreadyRecommended,
    isSignedIn,
    userMadeComment,
}: Props) => {
    const [count, setCount] = useState(initialCount);
    const [recommended, setRecommended] = useState(alreadyRecommended);

    const tryToRecommend = () => {
        const newCount = count + 1;
        setCount(newCount);
        setRecommended(true);

        //makeApi call
        recommend(commentId).then(accepted => {
            if (!accepted) {
                setCount(newCount - 1);
                setRecommended(alreadyRecommended);
            }
        });
    };

    return (
        <Row>
            <div className={countStyles}>{count}</div>
            <button
                className={buttonStyles(recommended, isSignedIn)}
                onClick={() => tryToRecommend()}
                disabled={recommended || !isSignedIn || userMadeComment}
                data-link-name="Recommend comment"
            >
                <div className={arrowStyles(recommended)}>
                    <ArrowUp />
                </div>
            </button>
        </Row>
    );
};
