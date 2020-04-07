import React from 'react';
import { Avatar } from './Avatar';

export default { component: Avatar, title: 'Avatar' };

export const Sizes = () => {
    return (
        <>
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
        </>
    );
};
Sizes.story = { name: 'different sizes' };

export const NoImage = () => {
    return (
        <>
            <Avatar size="medium" displayName="" />
        </>
    );
};
NoImage.story = { name: 'with no image url given' };
