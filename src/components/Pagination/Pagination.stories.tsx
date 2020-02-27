import React, { useState } from "react";
import { Pagination } from "./Pagination";

import { FilterOptions } from "../../types";

export default { component: Pagination, title: "Pagination" };

const DEFAULT_FILTERS: FilterOptions = {
  orderBy: "newest",
  pageSize: 25,
  threads: "collapsed",
  page: 1
};

export const Default = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      totalPages={9}
      page={page}
      setPage={setPage}
      filters={DEFAULT_FILTERS}
      commentCount={200}
    />
  );
};
Default.story = { name: "default" };

export const NoPages = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      totalPages={2}
      page={page}
      setPage={setPage}
      filters={DEFAULT_FILTERS}
      commentCount={56}
    />
  );
};
NoPages.story = { name: "with two pages" };

export const LotsOfPages = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      totalPages={187}
      page={page}
      setPage={setPage}
      filters={DEFAULT_FILTERS}
      commentCount={490000}
    />
  );
};
LotsOfPages.story = { name: "with many pages" };
