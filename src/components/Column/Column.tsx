import React from 'react';
import { css } from '@emotion/core';

type Props = { children: JSX.Element | JSX.Element[] };

export const Column = ({ children }: Props) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;
		`}
	>
		{children}
	</div>
);
