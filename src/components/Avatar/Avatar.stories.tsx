import React from 'react';

import { Avatar } from './Avatar';

export default { component: Avatar, title: 'Avatar' };

export const Sizes = () => {
	return (
		<React.Fragment>
			<Avatar
				imageUrl="https://avatar.guim.co.uk/no-user-image.gif"
				size="small"
				displayName=""
			/>
			<Avatar
				imageUrl="https://avatar.guim.co.uk/no-user-image.gif"
				size="medium"
				displayName=""
			/>
			<Avatar
				imageUrl="https://avatar.guim.co.uk/no-user-image.gif"
				size="large"
				displayName=""
			/>
		</React.Fragment>
	);
};
Sizes.story = { name: 'different sizes' };

export const NoImage = () => {
	return (
		<React.Fragment>
			<Avatar size="medium" displayName="" />
		</React.Fragment>
	);
};
NoImage.story = { name: 'with no image url given' };
