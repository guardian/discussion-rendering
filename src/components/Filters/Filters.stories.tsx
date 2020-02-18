import React, { useState } from "react";

import { FilterOptions } from "../../types";

import { Filters } from "./Filters";

export default { title: "Filters" };

export const Default = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    orderBy: "newest",
    pageSize: 5,
    threads: "collapsed",
    page: 1
  });
  return <Filters filters={filters} setFilters={setFilters} pages={5} />;
};
Default.story = { name: "default" };
