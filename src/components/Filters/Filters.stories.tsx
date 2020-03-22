import React, { useState } from "react";

import { FilterOptions } from "../../types";

import { Filters } from "./Filters";

export default { title: "Filters" };

export const Default = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    orderBy: "newest",
    pageSize: 5,
    threads: "collapsed"
  });
  return (
    <Filters filters={filters} onFilterChange={setFilters} totalPages={5} />
  );
};
Default.story = { name: "default" };
