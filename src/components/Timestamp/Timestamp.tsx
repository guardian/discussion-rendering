import React from "react";
import { css } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";
import { DateFromISOStringC } from "io-ts-types/lib/DateFromISOString";

import { dateFormatter } from "../../lib/dateFormatter";

type Props = {
  isoDateTime: DateFromISOStringC;
  linkTo: string;
};

const linkStyles = css`
  color: ${palette.neutral[46]};
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;
const timeStyles = css`
  ${textSans.xsmall({ fontWeight: "light" })}
  min-width: 0.75rem;
  margin-right: 0.3125rem;
`;

// TODO: on hover + link
export const Timestamp = ({ isoDateTime, linkTo }: Props) => {
  return (
    <a href={linkTo} className={linkStyles}>
      <time dateTime={isoDateTime.toString()} className={timeStyles}>
        {dateFormatter(isoDateTime)}
      </time>
    </a>
  );
};
