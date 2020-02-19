/// <reference types="react" />
declare type Props = {
  filters: FilterOptions;
  setFilters: (newFilterObject: FilterOptions) => void;
  pages: number;
};
declare type orderByType = "newest" | "oldest" | "mostrecommended";
declare type threadsType = "collapsed" | "expanded" | "unthreaded";
export declare type FilterOptions = {
  orderBy: orderByType;
  pageSize: number;
  threads: threadsType;
  currentPage: number;
};
export declare const defaultFilterOptions: FilterOptions;
export declare const Filters: ({
  filters,
  setFilters,
  pages
}: Props) => JSX.Element;
export {};
