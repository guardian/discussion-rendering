import React from 'react';
import { css } from 'emotion';

import { space, neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';

type Props = {
    previewHtml: string;
};

const previewStyle = css`
    ${textSans.small()}
    padding: ${space[2]}px ${space[4]}px;
    background-color: ${neutral[93]};
    border-radius: 5px;
    margin-top: 0;
    margin-bottom: ${20}px;
`;

const spout = css`
    display: block;
    left: 0;
    width: 0;
    height: 0;
    border-right: 1rem solid transparent;
    border-bottom: 1rem solid ${neutral[93]};
    margin-left: 12.5rem;
    border-right-style: inset;
`;

export const Preview = ({ previewHtml }: Props) => (
    <>
        <div className={spout} />
        <p
            className={previewStyle}
            dangerouslySetInnerHTML={{ __html: previewHtml || '' }}
        />
    </>
);
