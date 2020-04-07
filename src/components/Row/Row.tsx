import React from 'react';
import { css } from 'emotion';

type Props = { children: JSX.Element | JSX.Element[] };

export const Row = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: row;
        `}
    >
        {children}
    </div>
);
