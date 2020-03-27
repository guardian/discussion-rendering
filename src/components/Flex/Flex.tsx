import React from "react";
import { css } from "emotion";

type Props = {
  children: React.ReactNode;
  direction?: "row" | "column";
  justify?: "flex-start" | "space-between"; // Extend as required
  fullWidth?: boolean;
};

export const Flex = ({
  children,
  direction = "row",
  justify = "flex-start",
  fullWidth = false
}: Props) => (
  <div
    className={css`
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};
      ${fullWidth} {
        width: 100%;
      }
    `}
  >
    {children}
  </div>
);
