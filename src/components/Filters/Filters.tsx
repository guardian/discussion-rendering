import React from "react";
import { css } from "emotion";
import { space, neutral } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { Action, OrderByValues, ThreadValues } from "../../lib/reducer";

interface FilterOptions {
  orderBy: "newest" | "oldest" | "mostrecommended";
  pageSize: number;
  threads: "collapsed" | "expanded" | "unthreaded";
}

export const defaultFilterOptions: FilterOptions = {
  orderBy: "newest",
  pageSize: 25,
  threads: "unthreaded"
};

const filterBar = css`
  padding: ${space[3]}px 0;
  border-bottom: 1px solid ${neutral[97]};
  border-top: 1px solid ${neutral[97]};
  display: flex;
  list-style: none;
  ${textSans.small()};
  color: ${neutral[46]};

  li {
    flex: 1;
  }
`;

const filterLabel = css`
  position: relative;
  :not(:first-of-type):after {
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

export const Filters: React.FC<{
  filters: FilterOptions;
  dispatch: React.Dispatch<Action>;
}> = ({ filters, dispatch }) => {
  return (
    <form className={filterBar}>
      <label htmlFor="orderBy" className={filterLabel}>
        Order by
      </label>
      <select
        name="orderBy"
        id="orderBy"
        className={filterStyle}
        onChange={e =>
          dispatch({
            type: "SET_ORDER_BY",
            orderBy: e.target.value as OrderByValues
          })
        }
        value={filters.orderBy}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="mostrecommended">Recommendations</option>
      </select>

      <label htmlFor="pageSize" className={filterLabel}>
        Show
      </label>
      <select
        name="pageSize"
        id="pageSize"
        className={filterStyle}
        onChange={e =>
          dispatch({
            type: "SET_PAGE_SIZE",
            pageSize: Number(e.target.value)
          })
        }
        value={filters.pageSize}
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <label htmlFor="threads" className={filterLabel}>
        Threads
      </label>
      <select
        name="threads"
        id="threads"
        className={filterStyle}
        onChange={e =>
          dispatch({
            type: "SET_THREADS",
            threads: e.target.value as ThreadValues
          })
        }
        value={filters.threads}
      >
        <option value="collapsed">Collapsed</option>
        <option value="expanded">Expanded</option>
        <option value="unthreaded">Unthreaded</option>
      </select>
    </form>
  );
};
