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
  cursor: pointer;
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

const chevronStyles = (selected: boolean) => css`
  cursor: pointer;
  border-radius: 62.5rem;
  border-width: 0.0625rem;
  border-style: solid;
  box-sizing: border-box;
  background-color: ${palette.neutral[100]};
  border-color: ${palette.neutral[86]};
  :hover {
    border-color: ${palette.neutral[60]};
  }
  height: 1.5rem;
  padding: 0 0.5rem;
  margin-left: 5px;

  > svg {
    fill: ${palette.neutral[46]};
    transform: rotate(180deg);
  }
`;

const elipsisStyles = css`
  line-height: 26px;
  margin-left: 5px;
`;

const ChevronRight = () => (
  <svg width="6" height="12" viewBox="0 0 6 12">
    <path d="M6 11.5L1.5 6 6 .5 5.5 0 0 5.75v.5L5.5 12l.5-.5z"></path>
  </svg>
);

export const Pagination = ({ pages, currentPage, setPage }: Props) => {
  // Build an array of page numbers from the total cont of pages so
  // we can easily map over them in our jsx
  const pageArray = [];
  for (let page = 1; page <= pages; page++) {
    pageArray.push(page);
  }

  return (
    <div className={containerStyles}>
      {pageArray.length < 5
        ? pageArray.map(page => (
            <button
              key={page}
              className={buttonStyles(currentPage === page)}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          ))
        : pageArray.slice(0, 4).map(page => (
            <button
              key={page}
              className={buttonStyles(currentPage === page)}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          ))}
      <div className={elipsisStyles}>...</div>
      <button
        key={"last"}
        className={chevronStyles(currentPage === pageArray.length)}
        onClick={() => setPage(pageArray.length)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};
