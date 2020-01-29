import React from "react";
import { css } from "emotion";
import { space, neutral } from "@guardian/src-foundations";

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

  li {
    flex: 1;
  }
`;

export const Filters: React.FC<{
  filters: FilterOptions;
  setFilters: React.Dispatch<FilterOptions>;
}> = ({ filters, setFilters }) => {
  return (
    <form className={filterBar}>
      <label htmlFor="orderBy">Order by</label>
      <select
        name="orderBy"
        id="orderBy"
        onChange={
          e =>
            setFilters({
              ...filters,
              orderBy: e.target.value
            } as FilterOptions) // hacky
        }
        value={filters.orderBy}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="mostrecommended">Recommendations</option>
      </select>

      <label htmlFor="pageSize">Show</label>
      <select
        name="pageSize"
        id="pageSize"
        onChange={e =>
          setFilters({
            ...filters,
            pageSize: Number(e.target.value)
          } as FilterOptions)
        }
        value={filters.pageSize}
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <label htmlFor="threads">Threads</label>
      <select
        name="threads"
        id="threads"
        onChange={e =>
          setFilters({
            ...filters,
            threads: e.target.value
          } as FilterOptions)
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
