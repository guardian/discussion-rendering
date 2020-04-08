import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { SvgCheckmark } from '@guardian/src-svgs';

import { Row } from '../Row/Row';

import { PillarButton } from './PillarButton';

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
    <div
        className={css`
            width: ${space[amount]}px;
        `}
    />
);

export default { component: PillarButton, title: 'PillarButton' };

export const EachPillar = () => (
    <Row>
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="lifestyle"
        >
            Lifestyle
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="sport"
        >
            Sport
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="news"
        >
            News
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="opinion"
        >
            Opinion
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="culture"
        >
            Culture
        </PillarButton>
    </Row>
);
EachPillar.story = { name: 'with each pillar' };

export const IconLeft = () => (
    <PillarButton
        onClick={() => {
            alert('Clicked!');
        }}
        pillar="lifestyle"
        icon={<SvgCheckmark />}
        iconSide="left"
    >
        Left
    </PillarButton>
);
IconLeft.story = { name: 'with an icon on the left' };

export const IconRight = () => (
    <PillarButton
        onClick={() => {
            alert('Clicked!');
        }}
        pillar="sport"
        icon={<SvgCheckmark />}
        iconSide="right"
    >
        Right
    </PillarButton>
);

export const Secondary = () => (
    <Row>
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="lifestyle"
            priority="secondary"
        >
            Lifestyle
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="sport"
            priority="secondary"
        >
            Sport
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="news"
            priority="secondary"
        >
            News
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="opinion"
            priority="secondary"
        >
            Opinion
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="culture"
            priority="secondary"
        >
            Culture
        </PillarButton>
    </Row>
);
Secondary.story = { name: 'with secondary priority' };

export const Tertiary = () => (
    <Row>
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="lifestyle"
            priority="tertiary"
        >
            Lifestyle
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="sport"
            priority="tertiary"
        >
            Sport
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="news"
            priority="tertiary"
        >
            News
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="opinion"
            priority="tertiary"
        >
            Opinion
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="culture"
            priority="tertiary"
        >
            Culture
        </PillarButton>
    </Row>
);
Tertiary.story = { name: 'with tertiary priority' };
