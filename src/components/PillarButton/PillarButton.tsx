import React from 'react';
import { css } from 'emotion';

import { palette, neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';

import { Pillar } from '../../types';

import { pillarToString } from '../../lib/pillarToString';

type Props = {
	pillar: Pillar;
	onClick?: () => void;
	children: string;
	type?: 'submit';
	priority?: 'primary' | 'secondary' | 'subdued';
	icon?: JSX.Element;
	iconSide?: 'left' | 'right';
	linkName: string;
};

// Why key in Pillar? https://github.com/Microsoft/TypeScript/issues/24220#issuecomment-390063153
// Why this abstraction? To solve an issue where when we use the 800 key typescript throws errors. Most
// likely caused by the fact labs only uses 300 & 400 so the union is restricted
const localPalette: { [key in Pillar]: any } = {
	[Pillar.News]: {
		'800': '#FFF4F2',
	},
	[Pillar.Sport]: {
		'800': '#F1F8FC',
	},
	[Pillar.Culture]: {
		'800': '#FBF6EF',
	},
	[Pillar.Opinion]: {
		'800': '#FEF9F5',
	},
	[Pillar.Lifestyle]: {
		'800': '#FEEEF7',
	},
	[Pillar.Labs]: {
		'800': '#F1F8FC', // Same as sport
	},
};

const buttonOverrides = (
	pillar: Pillar,
	priority: 'primary' | 'secondary' | 'subdued',
) => {
	switch (priority) {
		case 'primary':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: ${palette[pillarToString(pillar)][300]};
					color: ${neutral[100]};

					:hover {
						background-color: ${palette[pillarToString(pillar)][400]};
					}
				}
			`;

		case 'secondary':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: transparent;
					border: 1px solid ${palette[pillarToString(pillar)][400]};
					color: ${palette[pillarToString(pillar)][400]};

					:hover {
						background-color: ${localPalette[pillar][800]};
					}
				}
			`;
		case 'subdued':
			return css`
				button {
					${textSans.small({ fontWeight: 'bold' })}
					background-color: transparent;
					color: ${palette[pillarToString(pillar)][400]};
					border-radius: 0;
				}
			`;
	}
};

export const PillarButton = ({
	pillar,
	onClick,
	type,
	priority = 'primary',
	children,
	icon,
	iconSide,
	linkName,
}: Props) => (
	<div className={buttonOverrides(pillar, priority)}>
		<Button
			priority={priority}
			size="small"
			onClick={onClick}
			type={type}
			icon={icon}
			iconSide={iconSide}
			data-link-name={linkName}
		>
			{children}
		</Button>
	</div>
);
