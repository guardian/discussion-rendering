import React from 'react';
import { css } from '@emotion/core';

import { palette, neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';
import { Pillar, Special, Theme } from '@guardian/types';

import { pillarToString } from '../../lib/pillarToString';

type Props = {
	pillar: Theme;
	onClick?: () => void;
	children: string;
	type?: 'submit';
	priority?: 'primary' | 'secondary' | 'subdued';
	icon?: JSX.Element;
	iconSide?: 'left' | 'right';
	linkName: string;
	size?: 'xsmall' | 'small' | 'default';
};

// Why this abstraction? To solve an issue where when we use the 800 key in `palette typescript throws errors. Most
// likely caused by the fact labs only uses 300 & 400 so the union is restricted
const dark = (pillar: Theme): string => {
	switch (pillar) {
		case Pillar.Culture:
			return '#FBF6EF';
		case Pillar.Opinion:
			return '#FEF9F5';
		case Pillar.Lifestyle:
			return '#FEEEF7';
		case Pillar.Sport:
			return '#F1F8FC';
		case Pillar.News:
		case Special.SpecialReport:
		case Special.Labs:
		default:
			return '#FFF4F2';
	}
};

const buttonOverrides = (
	pillar: Theme,
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
						background-color: ${dark(pillar)};
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
	size = 'default',
}: Props) => (
	<div css={buttonOverrides(pillar, priority)}>
		<Button
			priority={priority}
			size={size}
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
