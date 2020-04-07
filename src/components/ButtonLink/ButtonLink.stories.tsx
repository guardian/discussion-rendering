import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { SvgCheckmark } from '@guardian/src-svgs';

import { Row } from '../Row/Row';

import { ButtonLink } from './ButtonLink';

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
    <div
        className={css`
            width: ${space[amount]}px;
        `}
    />
);

export default { component: ButtonLink, title: 'ButtonLink' };

export const Single = () => (
    <ButtonLink
        onClick={() => {
            alert('Clicked!');
        }}
        pillar="lifestyle"
    >
        I'm a button but I look like a link. Click me
    </ButtonLink>
);
Single.story = { name: 'a single button' };

export const Group = () => (
    <Row>
        <ButtonLink onClick={() => {}} pillar="culture">
            Culture one
        </ButtonLink>
        <Space amount={3} />
        <ButtonLink onClick={() => {}} pillar="news">
            News two
        </ButtonLink>
        <Space amount={3} />
        <ButtonLink onClick={() => {}} pillar="sport">
            Sport three
        </ButtonLink>
    </Row>
);
Group.story = { name: 'a group of buttons' };

export const IconLeft = () => (
    <ButtonLink
        onClick={() => {}}
        pillar="news"
        icon={<SvgCheckmark />}
        iconSide="left"
    >
        Check to the left
    </ButtonLink>
);
IconLeft.story = { name: 'with an icon to the left' };

export const IconRight = () => (
    <ButtonLink
        onClick={() => {}}
        pillar="news"
        icon={<SvgCheckmark />}
        iconSide="right"
    >
        Check to the right
    </ButtonLink>
);
IconRight.story = { name: 'with an icon to the right' };

export const Grey = () => (
    <ButtonLink
        onClick={() => {
            alert('Clicked!');
        }}
    >
        This is how I look when no pillar is passed
    </ButtonLink>
);
Grey.story = { name: 'a button with no pillar' };

export const Background = () => (
    <div
        className={css`
            background-color: lightgrey;
            padding: 20px;
        `}
    >
        <ButtonLink onClick={() => {}} pillar="lifestyle">
            How do I look on a grey background?
        </ButtonLink>
    </div>
);
Background.story = { name: 'on a grey background' };
