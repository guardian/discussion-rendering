import React, { useState } from "react";
import { Pagination } from "./Pagination";

export default { component: Pagination, title: "Pagination" };

export const Default = () => {
  const [page, setPage] = useState(1);
  return <Pagination pages={9} page={page} setPage={setPage} />;
};
Default.story = { name: "default" };

export const NoPages = () => {
  return <Pagination pages={0} page={0} setPage={() => {}} />;
};
NoPages.story = { name: "with zero pages" };

export const LotsOfPages = () => {
  const [page, setPage] = useState(1);
  return <Pagination pages={187} page={page} setPage={setPage} />;
};
LotsOfPages.story = { name: "with many pages" };
