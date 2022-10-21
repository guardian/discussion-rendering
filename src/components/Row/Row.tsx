import { css } from '@emotion/react';
import React from 'react';

type Props = { children: React.ReactNode };

export const Row = ({ children }: Props) => (
	<div
		css={css`
			display: flex;
			flex-direction: row;
		`}
	>
		{children}
	</div>
);
