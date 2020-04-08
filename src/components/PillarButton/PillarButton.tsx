import React from 'react';
import { css } from 'emotion';

import { palette, neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';

import { Pillar } from '../../types';

type Props = {
    pillar: Pillar;
    onClick: () => void;
    children: string;
    priority?: 'primary' | 'secondary' | 'tertiary';
    icon?: JSX.Element;
    iconSide?: 'left' | 'right';
};

// Why key in Pillar? https://github.com/Microsoft/TypeScript/issues/24220#issuecomment-390063153
const localPalette: { [key in Pillar]: any } = {
    news: {
        '800': '#FFF4F2',
    },
    sport: {
        '800': '#F1F8FC',
    },
    culture: {
        '800': '#FBF6EF',
    },
    opinion: {
        '800': '#FEF9F5',
    },
    lifestyle: {
        '800': '#FEEEF7',
    },
    labs: {
        '800': '#F1F8FC',
    },
};

const buttonOverrides = (
    pillar: Pillar,
    priority: 'primary' | 'secondary' | 'tertiary',
) => {
    switch (priority) {
        case 'primary':
            return css`
                button {
                  ${textSans.small({ fontWeight: 'bold' })}
                  background-color: ${palette[pillar][300]};
                  color: ${neutral[100]};

                  :hover {
                    background-color: ${palette[pillar][400]};
                  }
                }
              `;

        case 'secondary':
            return css`
                button {
                    ${textSans.small({ fontWeight: 'bold' })}
                    background-color: transparent;
                    border: 1px solid ${palette[pillar][400]};
                    color: ${palette[pillar][400]};

                    :hover {
                        background-color: ${localPalette[pillar][800]};
                    }
                }
            `;
        case 'tertiary':
            return css`
                button {
                    ${textSans.small({ fontWeight: 'bold' })}
                    background-color: transparent;
                    color: ${palette[pillar][400]};
                    border-radius: 0;
                }
            `;
    }
};

export const PillarButton = ({
    pillar,
    onClick,
    priority = 'primary',
    children,
    icon,
    iconSide,
}: Props) => (
    <div className={buttonOverrides(pillar, priority)}>
        <Button
            priority={priority}
            size="small"
            onClick={onClick}
            icon={icon}
            iconSide={iconSide}
        >
            {children}
        </Button>
    </div>
);
