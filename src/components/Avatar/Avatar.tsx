import React from 'react';
import { css } from 'emotion';

type Props = {
	imageUrl?: string;
	displayName: string;
	size: 'small' | 'medium' | 'large';
};

const imageStyles = (size: number) => css`
	border-radius: ${size + 10}px;
	width: ${size}px;
	height: ${size}px;
`;

export const Avatar = ({
	imageUrl = 'https://avatar.guim.co.uk/no-user-image.gif',
	displayName,
	size,
}: Props) => {
	switch (size) {
		case 'small':
			return (
				<img src={imageUrl} alt={displayName} className={imageStyles(36)} />
			);
		case 'large':
			return (
				<img src={imageUrl} alt={displayName} className={imageStyles(60)} />
			);
		case 'medium':
		default:
			return (
				<img src={imageUrl} alt={displayName} className={imageStyles(48)} />
			);
	}
};
