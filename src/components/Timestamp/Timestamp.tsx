import React, { useState } from "react";
import { css } from "emotion";

import { textSans } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";

import { dateFormatter } from "../../lib/dateFormatter";
import { useInterval } from "../../lib/useInterval";

type Props = {
  isoDateTime: string;
  linkTo: string;
};

const linkStyles = css`
  color: ${palette.neutral[46]};
  text-decoration: none;
  :hover,
  :focus {
    text-decoration: underline;
  }
`;
const timeStyles = css`
  ${textSans.xsmall({ fontWeight: "light" })}
  min-width: 0.75rem;
  margin-right: 0.3125rem;
`;

export const Timestamp = ({ isoDateTime, linkTo }: Props) => {
  let [timeAgo, setTimeAgo] = useState(dateFormatter(isoDateTime));

  useInterval(() => {
    setTimeAgo(dateFormatter(isoDateTime));
  }, 15000);

  return (
    <a href={linkTo} className={linkStyles}>
      <time dateTime={isoDateTime.toString()} className={timeStyles}>
        {timeAgo}
      </time>
    </a>
  );
};
