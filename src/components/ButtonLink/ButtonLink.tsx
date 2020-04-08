import React from 'react';
import { css, cx } from 'emotion';

import { palette, space, neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Button } from '@guardian/src-button';

import { Pillar } from '../../types';

type Props = {
    onClick: () => void;
    pillar?: Pillar;
    size?: 'small' | 'default';
    icon?: JSX.Element;
    iconSide?: 'left' | 'right';
    children: string;
};

const buttonOverrides = (size: 'small' | 'default', pillar?: Pillar) => css`
  button {
    ${textSans[size === 'small' ? 'xsmall' : 'small']({
        fontWeight: pillar ? 'bold' : 'regular',
    })}
    color: ${pillar ? palette[pillar][400] : neutral[46]};
    background-color: transparent;
    height: 18px;
    min-height: 18px;
    /* Radius 0 is used to style focus halo */
    border-radius: 0;
    /* Reduce the space inbetween the svg icon and text */
    svg {
      margin-left: ${space[1]}px;
      margin-right: ${space[1]}px;
    }

    :hover {
      text-decoration: underline;
      text-decoration-color: ${pillar ? palette[pillar][400] : neutral[46]};
    }
  }
`;

export const ButtonLink = ({
    pillar,
    onClick,
    size = 'default',
    icon,
    iconSide,
    children,
}: Props) => (
    <div className={cx(buttonOverrides(size, pillar))}>
        <Button
            priority="tertiary"
            size={size}
            onClick={onClick}
            icon={icon}
            iconSide={iconSide}
        >
            {children}
        </Button>
    </div>
);
