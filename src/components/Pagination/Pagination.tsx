import React from "react";
import { css } from "emotion";
// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

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
  width: 1.1875rem;
  height: 1.1875rem;
  background-color: ${selected ? "blue" : "#f6f6f6"};
  border-radius: 62.5rem;
  border: none;
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
