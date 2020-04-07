import React from "react";
import { css, cx } from "emotion";

import { palette, space } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Button } from "@guardian/src-button";

import { Pillar } from "../../types";

type Props = {
  pillar: Pillar;
  onClick: () => void;
  icon?: JSX.Element;
  iconSide?: "left" | "right";
  children: string;
};

const buttonOverrides = (pillar: Pillar) => css`
  button {
    ${textSans.xsmall({ fontWeight: "bold" })}
    color: ${palette[pillar][400]};
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
      text-decoration-color: ${palette[pillar][400]};
    }
  }
`;

export const ButtonLink = ({
  pillar,
  onClick,
  icon,
  iconSide,
  children,
}: Props) => (
  <div className={cx(buttonOverrides(pillar))}>
    <Button
      priority="tertiary"
      size="small"
      onClick={onClick}
      icon={icon}
      iconSide={iconSide}
    >
      {children}
    </Button>
  </div>
);
