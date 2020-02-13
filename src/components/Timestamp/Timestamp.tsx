import React from "react";
import { css } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";

import { dateFormatter } from "../../lib/dateFormatter";

type Props = {
  date: Date;
  permalink: string;
};

const isoDateTime = "2010-11-18T14:22:39Z";

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;
const countStyles = css`
  ${textSans.xsmall({ fontWeight: "light" })}
  min-width: 0.75rem;
  color: ${palette.neutral[46]};
  margin-right: 0.3125rem;
`;

// TODO: on hover + link
export const Timestamp = () => {
  return (
    <div className={containerStyles}>
      <div className={countStyles}>{dateFormatter(isoDateTime)}</div>
    </div>
  );
};
