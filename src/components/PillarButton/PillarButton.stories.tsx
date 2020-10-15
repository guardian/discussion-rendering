import React from 'react';
import { css } from 'emotion';

import { space } from '@guardian/src-foundations';
import { SvgCheckmark } from '@guardian/src-icons';

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
            linkName=""
        >
            Lifestyle
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="sport"
            linkName=""
        >
            Sport
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="news"
            linkName=""
        >
            News
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="opinion"
            linkName=""
        >
            Opinion
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="culture"
            linkName=""
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
        linkName="left"
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
        linkName=""
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
            linkName=""
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
            linkName=""
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
            linkName=""
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
            linkName=""
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
            linkName=""
        >
            Culture
        </PillarButton>
    </Row>
);
Secondary.story = { name: 'with secondary priority' };

export const Subdued = () => (
    <Row>
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="lifestyle"
            priority="subdued"
            linkName=""
        >
            Lifestyle
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="sport"
            priority="subdued"
            linkName=""
        >
            Sport
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="news"
            priority="subdued"
            linkName=""
        >
            News
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="opinion"
            priority="subdued"
            linkName=""
        >
            Opinion
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="culture"
            priority="subdued"
            linkName=""
        >
            Culture
        </PillarButton>
    </Row>
);
Subdued.story = { name: 'with subdued priority' };
