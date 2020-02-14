import React from "react";
import { css } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";

type Props = {
  pages: number;
  currentPage: number;
  setPage: Function;
};

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;

const buttonStyles = (selected: boolean) => css`
  ${textSans.xsmall({ fontWeight: "bold" })}

  text-decoration: none;
  border-radius: 62.5rem;
  box-sizing: border-box;

  color: ${selected ? palette.neutral[100] : palette.neutral[46]};
  background-color: ${selected ? palette.neutral[46] : palette.neutral[100]};
  border: none;
  :hover {
    border-width: 0.0625rem;
    border-style: solid;
    border-color: ${palette.neutral[46]};
  }

  margin-left: 5px;
  padding: 0 0.125rem;
  min-width: 1.5rem;
  text-align: center;

  height: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Pagination = ({ pages, currentPage, setPage }: Props) => {
  // Build an array of page numbers from the total cont of pages so
  // we can easily map over them in our jsx
  const pageArray = [];
  for (let page = 1; page <= pages; page++) {
    pageArray.push(page);
  }

  return (
    <div className={containerStyles}>
      {pageArray.map(page => (
        <button
          key={page}
          className={buttonStyles(currentPage === page)}
          onClick={() => setPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
