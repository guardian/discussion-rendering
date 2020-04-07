import React from 'react';
import { css } from 'emotion';

type Props = { children: JSX.Element | JSX.Element[] };

export const Column = ({ children }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: column;
        `}
    >
        {children}
    </div>
);
