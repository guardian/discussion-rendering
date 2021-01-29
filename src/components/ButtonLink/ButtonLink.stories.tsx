import React from 'react';
import { css } from '@emotion/core';

import { space } from '@guardian/src-foundations';
import { SvgCheckmark } from '@guardian/src-icons';

import { Pillar } from '@guardian/types';

import { Row } from '../Row/Row';

import { ButtonLink } from './ButtonLink';

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
	<div
		css={css`
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
		pillar={Pillar.Lifestyle}
		linkName=""
	>
		I'm a button but I look like a link. Click me
	</ButtonLink>
);
Single.story = { name: 'a single button' };

export const Small = () => (
	<ButtonLink
		onClick={() => {
			alert('Clicked!');
		}}
		size="small"
		pillar={Pillar.Lifestyle}
		linkName=""
	>
		I'm small
	</ButtonLink>
);
Small.story = { name: 'a small button' };

export const Group = () => (
	<Row>
		<ButtonLink onClick={() => {}} pillar={Pillar.Culture} linkName="">
			Culture one
		</ButtonLink>
		<Space amount={3} />
		<ButtonLink onClick={() => {}} pillar={Pillar.News} linkName="">
			News two
		</ButtonLink>
		<Space amount={3} />
		<ButtonLink onClick={() => {}} pillar={Pillar.Sport} linkName="">
			Sport three
		</ButtonLink>
	</Row>
);
Group.story = { name: 'a group of buttons' };

export const IconLeft = () => (
	<ButtonLink
		onClick={() => {}}
		pillar={Pillar.News}
		icon={<SvgCheckmark />}
		iconSide="left"
		linkName=""
	>
		Check to the left
	</ButtonLink>
);
IconLeft.story = { name: 'with an icon to the left' };

export const IconRight = () => (
	<ButtonLink
		onClick={() => {}}
		pillar={Pillar.News}
		icon={<SvgCheckmark />}
		iconSide="right"
		linkName=""
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
		linkName=""
	>
		This is how I look when no pillar is passed
	</ButtonLink>
);
Grey.story = { name: 'a button with no pillar' };

export const Background = () => (
	<div
		css={css`
			background-color: lightgrey;
			padding: 20px;
		`}
	>
		<ButtonLink onClick={() => {}} pillar={Pillar.Lifestyle} linkName="">
			How do I look on a grey background?
		</ButtonLink>
	</div>
);
Background.story = { name: 'on a grey background' };
