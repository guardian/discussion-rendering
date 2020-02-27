import React from "react";
import { css, cx } from "emotion";

import { textSans } from "@guardian/src-foundations/typography";
import { palette, neutral } from "@guardian/src-foundations";
import { until } from "@guardian/src-foundations/mq";

import { FilterOptions } from "../../types";

type Props = {
  totalPages: number;
  page: number;
  setPage: Function;
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
  border-top: 1px solid #dcdcdc;
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

const Forward = ({ page, setPage }: { page: number; setPage: Function }) => (
  <button
    key={"last"}
    className={cx(chevronStyles(false), rotateSvg)}
    onClick={() => setPage(page + 1)}
  >
    <ChevronBack />
  </button>
);

const Back = ({ page, setPage }: { page: number; setPage: Function }) => (
  <button
    key={"last"}
    className={chevronStyles(false)}
    onClick={() => setPage(page - 1 < 0 ? 0 : page - 1)}
  >
    <ChevronBack />
  </button>
);

const PageButton = ({
  page,
  setPage,
  isSelected
}: {
  page: number;
  setPage: Function;
  isSelected: boolean;
}) => (
  <button
    key={page}
    className={buttonStyles(isSelected)}
    onClick={() => setPage(page)}
  >
    {page}
  </button>
);

const decideSecondPage = ({
  page,
  totalPages
}: {
  page: number;
  totalPages: number;
}) => {
  if (page < 4) return 2;
  if (page > totalPages - 2) return totalPages - 2;
  return page - 1;
};

const decideThirdPage = ({
  page,
  totalPages
}: {
  page: number;
  totalPages: number;
}) => {
  if (page < 4) return 3;
  if (page > totalPages - 2) return totalPages - 1;
  return page;
};

const decideForthPage = ({
  page,
  totalPages
}: {
  page: number;
  totalPages: number;
}) => {
  if (page < 4) return 4;
  if (page > totalPages - 2) return totalPages;
  return page + 1;
};

export const Pagination = ({
  totalPages,
  page,
  setPage,
  commentCount,
  filters
}: Props) => {
  // Make decisions aobut which pagination elements to show
  const showBackButton = totalPages > 4 && page > 1;
  const showFirstElipsis = totalPages > 4 && page > 3;
  const secondPage = decideSecondPage({ page, totalPages });
  const thirdPage = decideThirdPage({ page, totalPages });
  const forthPage = decideForthPage({ page, totalPages });
  const showThirdPage = totalPages > 2;
  const showForthPage = totalPages > 3;
  const showLastPage = page < totalPages - 1;
  const lastPage = totalPages;
  const showSecondElipsis = totalPages > 4 && page < totalPages - 2;
  const showForwardButton = totalPages > 4 && page !== totalPages;

  // Pagination Text
  const startIndex = filters.pageSize * (filters.page - 1);
  const endIndex =
    filters.pageSize * filters.page < commentCount
      ? filters.pageSize * filters.page
      : commentCount;

  return (
    <div className={paginationWrapper}>
      <div className={paginationSelectors}>
        {showBackButton && <Back page={page} setPage={setPage} />}
        <PageButton page={1} setPage={setPage} isSelected={page === 1} />
        {showFirstElipsis && <div className={elipsisStyles}>&hellip;</div>}
        <PageButton
          page={secondPage}
          setPage={setPage}
          isSelected={page === secondPage}
        />
        {showThirdPage && (
          <PageButton
            page={thirdPage}
            setPage={setPage}
            isSelected={page === thirdPage}
          />
        )}
        {showForthPage && (
          <PageButton
            page={forthPage}
            setPage={setPage}
            isSelected={page === forthPage}
          />
        )}
        {showSecondElipsis && <div className={elipsisStyles}>&hellip;</div>}
        {showLastPage && (
          <PageButton
            page={lastPage}
            setPage={setPage}
            isSelected={page === lastPage}
          />
        )}
        {showForwardButton && <Forward page={page} setPage={setPage} />}
      </div>
      {commentCount && (
        <div className={paginationText}>
          {`Displaying comments ${startIndex} to ${endIndex} of ${commentCount}`}
        </div>
      )}
    </div>
  );
};
