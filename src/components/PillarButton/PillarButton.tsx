import React from 'react';
import { css } from 'emotion';

import { palette, neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';

import { Pillar } from '../../types';

type Props = {
    pillar: Pillar;
    onClick: () => void;
    icon?: JSX.Element;
    iconSide?: 'left' | 'right';
    children: string;
};

const buttonOverrides = (pillar: Pillar) => css`
    button {
      ${textSans.small({ fontWeight: 'bold' })}
      background-color: ${palette[pillar][300]};
      color: ${neutral[100]};

      :hover {
        background-color: ${palette[pillar][400]};
      }
    }
`;

export const PillarButton = ({
    pillar,
    onClick,
    icon,
    iconSide,
    children,
}: Props) => (
    <div className={buttonOverrides(pillar)}>
        <Button
            priority="primary"
            size="small"
            onClick={onClick}
            icon={icon}
            iconSide={iconSide}
        >
            {children}
        </Button>
    </div>
);
