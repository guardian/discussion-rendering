/// <reference types="react" />
declare type Props = {
  pages: number;
  currentPage: number;
  setPage: Function;
};
export declare const Pagination: ({
  pages,
  currentPage,
  setPage
}: Props) => JSX.Element;
export {};
