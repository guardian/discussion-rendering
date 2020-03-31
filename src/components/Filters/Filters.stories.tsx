import React, { useState } from "react";

import { FilterOptions } from "../../types";

import { Filters } from "./Filters";

export default { title: "Filters" };

export const Default = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    orderBy: "newest",
    pageSize: 25,
    threads: "collapsed"
  });
  return (
    <Filters
      filters={filters}
      onFilterChange={setFilters}
      totalPages={5}
      commentCount={74}
    />
  );
};
Default.story = { name: "default" };
