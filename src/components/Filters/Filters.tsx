import React from "react";
import { css, cx } from "emotion";

import { space, neutral } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { until } from "@guardian/src-foundations/mq";

import { Pagination } from "../Pagination/Pagination";
import { FilterOptions, OrderByType, ThreadsType } from "../../types";

type Props = {
  filters: FilterOptions;
  onFilterChange: (newFilterObject: FilterOptions) => void;
  totalPages: number;
  commentCount: number;
};

const filterBar = css`
  ${textSans.small()};
  color: ${neutral[46]};

  padding: ${space[3]}px 0;
  border-bottom: 1px solid ${neutral[86]};
  border-top: 1px solid ${neutral[86]};

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  flex-direction: column;
`;

const filterLabel = css`
  position: relative;
  margin-left: 8px;
  :after {
    content: "";
    display: block;
    width: 1px;
    background-color: ${neutral[86]};
    position: absolute;
    top: -5px;
    bottom: -25px;
    left: -10px;
  }
`;

const filterStyle = css`
  border: none;
  background: #fff;
  ${textSans.small()};
  font-weight: bold;
  color: ${neutral[46]};
  margin-right: ${space[5]}px;
  ${until.mobileLandscape} {
    margin-right: 10px;
  }
`;

const filterContainer = css`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const filterWrapperStyles = css`
  display: flex;
  flex-direction: column;
`;

export const Filters = ({
  filters,
  onFilterChange,
  totalPages,
  commentCount
}: Props) => (
  <div className={filterBar}>
    <div className={filterContainer}>
      <div className={filterWrapperStyles}>
        <label
          htmlFor="orderBy"
          className={cx(
            filterLabel,
            css`
              :after {
                display: none;
              }
            `
          )}
        >
          Order by
        </label>
        <select
          name="orderBy"
          id="orderBy"
          className={filterStyle}
          onChange={e =>
            onFilterChange({
              ...filters,
              orderBy: e.target.value as OrderByType
            })
          }
          value={filters.orderBy}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostrecommended">Recommendations</option>
        </select>
      </div>

      <div className={filterWrapperStyles}>
        <label htmlFor="pageSize" className={filterLabel}>
          Show
        </label>
        <select
          name="pageSize"
          id="pageSize"
          className={filterStyle}
          onChange={e =>
            onFilterChange({
              ...filters,
              pageSize: Number(e.target.value) as number
            })
          }
          value={filters.pageSize}
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className={filterWrapperStyles}>
        <label htmlFor="threads" className={filterLabel}>
          Threads
        </label>
        <select
          name="threads"
          id="threads"
          className={filterStyle}
          onChange={e =>
            onFilterChange({
              ...filters,
              threads: e.target.value as ThreadsType
            })
          }
          value={filters.threads}
        >
          <option value="collapsed">Collapsed</option>
          <option value="expanded">Expanded</option>
          <option value="unthreaded">Unthreaded</option>
        </select>
      </div>
    </div>
    {totalPages > 1 && (
      <Pagination
        totalPages={totalPages}
        page={filters.page}
        setPage={(page: number) => {
          onFilterChange({
            ...filters,
            page
          });
        }}
        commentCount={commentCount}
        filters={filters}
      />
    )}
  </div>
);
