import React from "react";
import { css, cx } from "emotion";

import { textSans } from "@guardian/src-foundations/typography";
import { neutral, border, space } from "@guardian/src-foundations";
import { until } from "@guardian/src-foundations/mq";

import { FilterOptions } from "../../types";

type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Function;
  commentCount: number;
  filters: FilterOptions;
};

const buttonStyles = (isSelected: boolean) => css`
  cursor: pointer;
  ${textSans.small({ fontWeight: "bold" })}

  text-decoration: none;
  border-radius: 62.5rem;
  box-sizing: border-box;

  color: ${isSelected ? palette.neutral[100] : palette.neutral[46]};
  background-color: ${isSelected ? palette.neutral[46] : palette.neutral[100]};
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

const chevronStyles = (isSelected: boolean) => css`
  cursor: pointer;
  border-radius: 62.5rem;
  border-width: 0.0625rem;
  border-style: solid;
  box-sizing: border-box;
  background-color: ${isSelected ? palette.neutral[46] : palette.neutral[100]};
  border-color: ${palette.neutral[86]};
  :hover {
    border-color: ${palette.neutral[60]};
  }
  height: 1.5rem;
  padding: 0 0.5rem;
  margin-left: 5px;

  > svg {
    fill: ${isSelected ? palette.neutral[100] : palette.neutral[46]};
  }
`;

const elipsisStyles = css`
  line-height: 26px;
  margin-left: 5px;
`;

const rotateSvg = css`
  svg {
    transform: rotate(180deg);
  }
`;

const paginationWrapper = css`
  ${textSans.small()};
  color: ${neutral[46]};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid ${border.secondary};
  ${until.mobileLandscape} {
    flex-direction: column;
  }
`;

const paginationSelectors = css`
  display: flex;
  flex-direction: row;
  height: 25px;
`;

const paginationText = css`
  margin-left: 5px;
  ${until.mobileLandscape} {
    padding-top: 10px;
  }
`;

const ChevronBack = () => (
  <svg width="6" height="12" viewBox="0 0 6 12">
    <path d="M6 11.5L1.5 6 6 .5 5.5 0 0 5.75v.5L5.5 12l.5-.5z"></path>
  </svg>
);

const Forward = ({
  currentPage,
  setCurrentPage
}: {
  currentPage: number;
  setCurrentPage: Function;
}) => (
  <button
    key={"last"}
    className={cx(chevronStyles(false), rotateSvg)}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    <ChevronBack />
  </button>
);

const Back = ({
  currentPage,
  setCurrentPage
}: {
  currentPage: number;
  setCurrentPage: Function;
}) => (
  <button
    key={"last"}
    className={chevronStyles(false)}
    onClick={() => setCurrentPage(currentPage - 1 < 0 ? 0 : currentPage - 1)}
  >
    <ChevronBack />
  </button>
);

const PageButton = ({
  currentPage,
  setCurrentPage,
  isSelected
}: {
  currentPage: number;
  setCurrentPage: Function;
  isSelected: boolean;
}) => (
  <button
    key={currentPage}
    className={buttonStyles(isSelected)}
    onClick={() => setCurrentPage(currentPage)}
  >
    {currentPage}
  </button>
);

const decideSecondPage = ({
  currentPage,
  totalPages
}: {
  currentPage: number;
  totalPages: number;
}) => {
  if (currentPage < 4) return 2;
  if (currentPage > totalPages - 2) return totalPages - 2;
  return currentPage - 1;
};

const decideThirdPage = ({
  currentPage,
  totalPages
}: {
  currentPage: number;
  totalPages: number;
}) => {
  if (currentPage < 4) return 3;
  if (currentPage > totalPages - 2) return totalPages - 1;
  return currentPage;
};

const decideForthPage = ({
  currentPage,
  totalPages
}: {
  currentPage: number;
  totalPages: number;
}) => {
  if (currentPage < 4) return 4;
  if (currentPage > totalPages - 2) return totalPages;
  return currentPage + 1;
};

export const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  commentCount,
  filters
}: Props) => {
  // Make decisions aobut which pagination elements to show
  const showBackButton = totalPages > 4 && currentPage > 1;
  const showFirstElipsis = totalPages > 4 && currentPage > 3;
  const secondPage = decideSecondPage({ currentPage, totalPages });
  const thirdPage = decideThirdPage({ currentPage, totalPages });
  const forthPage = decideForthPage({ currentPage, totalPages });
  const showThirdPage = totalPages > 2;
  const showForthPage = totalPages > 3;
  const showLastPage = currentPage < totalPages - 1;
  const lastPage = totalPages;
  const showSecondElipsis = totalPages > 4 && currentPage < totalPages - 2;
  const showForwardButton = totalPages > 4 && currentPage !== totalPages;

  // Pagination Text
  const startIndex = filters.pageSize * (filters.page - 1);
  const endIndex =
    filters.pageSize * filters.page < commentCount
      ? filters.pageSize * filters.page
      : commentCount;

  return (
    <div className={paginationWrapper}>
      <div className={paginationSelectors}>
        {showBackButton && (
          <Back currentPage={currentPage} setCurrentPage={setCurrentPage} />
        )}
        <PageButton
          currentPage={1}
          setCurrentPage={setCurrentPage}
          isSelected={currentPage === 1}
        />
        {showFirstElipsis && <div className={elipsisStyles}>&hellip;</div>}
        <PageButton
          currentPage={secondPage}
          setCurrentPage={setCurrentPage}
          isSelected={currentPage === secondPage}
        />
        {showThirdPage && (
          <PageButton
            currentPage={thirdPage}
            setCurrentPage={setCurrentPage}
            isSelected={currentPage === thirdPage}
          />
        )}
        {showForthPage && (
          <PageButton
            currentPage={forthPage}
            setCurrentPage={setCurrentPage}
            isSelected={currentPage === forthPage}
          />
        )}
        {showSecondElipsis && <div className={elipsisStyles}>&hellip;</div>}
        {showLastPage && (
          <PageButton
            currentPage={lastPage}
            setCurrentPage={setCurrentPage}
            isSelected={currentPage === lastPage}
          />
        )}
        {showForwardButton && (
          <Forward currentPage={currentPage} setCurrentPage={setCurrentPage} />
        )}
      </div>
      {commentCount && (
        <div className={paginationText}>
          {`Displaying comments ${startIndex} to ${endIndex} of ${commentCount}`}
        </div>
      )}
    </div>
  );
};
