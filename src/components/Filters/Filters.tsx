import React from "react";
import { css } from "emotion";

import { space, neutral } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";

import { Pagination } from "../Pagination/Pagination";
import { FilterOptions, OrderByType, ThreadsType } from "../../types";

type Props = {
  filters: FilterOptions;
  setFilters: (newFilterObject: FilterOptions) => void;
  pages: number;
};

const filterBar = css`
  padding: ${space[3]}px 0;
  border-bottom: 1px solid ${neutral[86]};
  border-top: 1px solid ${neutral[86]};
  display: flex;
  list-style: none;
  ${textSans.small()};
  color: ${neutral[46]};

  li {
    flex: 1;
  }

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  @media screen and (max-width: 740px) {
    flex-direction: column;
  }
`;

const filterLabel = css`
  position: relative;
  :after {
    content: "";
    display: block;
    width: 1px;
    background-color: ${neutral[86]};
    position: absolute;
    top: -5px;
    bottom: -5px;
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
`;

const filterContainer = css`
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const pageSizeStyles = css`
  @media screen and (max-width: 740px) {
    display: none;
  }
`;

export const Filters = ({ filters, setFilters, pages }: Props) => (
  <div className={filterBar}>
    <div className={filterContainer}>
      <label htmlFor="orderBy" className={filterLabel}>
        Order by
      </label>
      <select
        name="orderBy"
        id="orderBy"
        className={filterStyle}
        onChange={e =>
          setFilters({
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

      <div className={pageSizeStyles}>
        <label htmlFor="pageSize" className={filterLabel}>
          Show
        </label>
        <select
          name="pageSize"
          id="pageSize"
          className={filterStyle}
          onChange={e =>
            setFilters({
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

      <label htmlFor="threads" className={filterLabel}>
        Threads
      </label>
      <select
        name="threads"
        id="threads"
        className={filterStyle}
        onChange={e =>
          setFilters({
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
    <div
      className={css`
        display: flex;
        @media screen and (max-width: 740px) {
          width: 100%;
          justify-content: center;
          margin-top: 15px;
        }
      `}
    >
      <Pagination
        pages={pages}
        page={filters.page}
        setPage={(page: number) => {
          setFilters({
            ...filters,
            page: page
          });
        }}
      />
    </div>
  </div>
);
