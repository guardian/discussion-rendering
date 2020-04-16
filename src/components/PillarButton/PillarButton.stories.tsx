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
            linkName="ophanLinkName"
        >
            Lifestyle
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="sport"
            linkName="ophanLinkName"
        >
            Sport
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="news"
            linkName="ophanLinkName"
        >
            News
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="opinion"
            linkName="ophanLinkName"
        >
            Opinion
        </PillarButton>
        <Space amount={2} />
        <PillarButton
            onClick={() => {
                alert('Clicked!');
            }}
            pillar="culture"
            linkName="ophanLinkName"
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
        linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
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
            linkName="ophanLinkName"
        >
            Culture
        </PillarButton>
    </Row>
);
Subdued.story = { name: 'with subdued priority' };
