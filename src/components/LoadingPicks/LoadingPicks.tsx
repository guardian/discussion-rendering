import React from 'react';
import { css, keyframes } from 'emotion';

import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';

import { Row } from '../Row/Row';

const BACKGROUND_COLOUR = neutral[93];

const shimmer = keyframes`
  0% {
    background-position: -1500px 0;
  }
  100% {
    background-position: 1500px 0;
  }
`;

const shimmerStyles = css`
    animation: ${shimmer} 2s infinite linear;
    background: linear-gradient(
        to right,
        ${BACKGROUND_COLOUR} 4%,
        ${neutral[86]} 25%,
        ${BACKGROUND_COLOUR} 36%
    );
    background-size: 1500px 100%;
`;

const containerStyles = css`
    width: 220px;
    display: flex;
    padding: ${space[2]}px 0;
`;

const avatarStyles = (size: number) => css`
    border-radius: ${size + 10}px;
    width: ${size + 10}px;
    height: ${size}px;
    background-color: ${BACKGROUND_COLOUR};
    margin-right: ${space[2]}px;

    ${shimmerStyles}
`;

const pickBoxStyles = css`
    padding: ${space[3]}px;
    background-color: ${BACKGROUND_COLOUR};
    border-radius: 15px;
    margin-bottom: 30px;
    position: relative;
    height: 150px;

    :before {
        content: '';
        margin-left: ${space[6]}px;
        position: absolute;
        border-right: 25px solid transparent;
        border-top: 26px solid ${BACKGROUND_COLOUR};
        bottom: -26px;
    }

    ${shimmerStyles}
`;

const FullWidthColumn = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
            width: 100%;
        `}
    >
        {children}
    </div>
);

const Grey = ({
    height,
    width,
    spaceBelow,
    spaceLeft,
}: {
    height: number;
    width?: number;
    spaceBelow?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
    spaceLeft?: 1 | 2 | 3 | 4 | 5 | 6 | 9;
}) => (
    <div
        className={css`
            height: ${height}px;
            width: ${width ? `${width}px` : '100%'};
            margin-bottom: ${spaceBelow && space[spaceBelow]}px;
            margin-left: ${spaceLeft && space[spaceLeft]}px;
            background-color: ${BACKGROUND_COLOUR};

            ${shimmerStyles}
        `}
    />
);

export const LoadingPicks = () => (
    <div className={containerStyles}>
        <FullWidthColumn>
            <div className={pickBoxStyles} />
            <Row>
                <div className={avatarStyles(48)} />
                <FullWidthColumn>
                    <Grey height={20} width={90} spaceBelow={1} />
                    <Grey height={15} width={50} spaceBelow={9} />
                </FullWidthColumn>
            </Row>
        </FullWidthColumn>
    </div>
);
