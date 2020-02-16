import React, { useState } from "react";

import { Filters, FilterOptions } from "./Filters";

export default { title: "Filters" };

export const Default = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    orderBy: "newest",
    pageSize: 5,
    threads: "collapsed",
    page: 1
  });
  return <Filters filters={filters} setFilters={setFilters} pages={3} />;
};
Default.story = { name: "default" };
