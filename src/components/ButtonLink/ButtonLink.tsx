import React from 'react';
import { css, cx } from 'emotion';

import { palette, space, neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';

import { Pillar } from '@guardian/types/Format';

import { pillarToString } from '../../lib/pillarToString';

type Props = {
	onClick: () => void;
	pillar?: Pillar;
	size?: 'small' | 'default';
	icon?: JSX.Element;
	iconSide?: 'left' | 'right';
	children: string | JSX.Element;
	linkName: string;
};

const buttonOverrides = (size: 'small' | 'default', pillar?: Pillar) => {
	const pillarString = pillar || pillar === 0 ? pillarToString(pillar) : null;
	return css`
		button {
			${textSans[size === 'small' ? 'xsmall' : 'small']({
				fontWeight: pillarString ? 'bold' : 'regular',
			})}
			color: ${pillarString ? palette[pillarString][400] : neutral[46]};
			background-color: transparent;
			height: 18px;
			min-height: 18px;
			/* Radius 0 is used to style focus halo */
			border-radius: 0;

			:hover {
				text-decoration: underline;
				text-decoration-color: ${pillarString
					? palette[pillarString][400]
					: neutral[46]};
			}
		}
	`;
};

export const ButtonLink = ({
	pillar,
	onClick,
	size = 'default',
	icon,
	iconSide,
	children,
	linkName,
}: Props) => (
	<div className={cx(buttonOverrides(size, pillar))}>
		<Button
			priority="subdued"
			size={size}
			onClick={onClick}
			icon={icon}
			iconSide={iconSide}
			data-link-name={linkName}
		>
			{children}
		</Button>
	</div>
);
