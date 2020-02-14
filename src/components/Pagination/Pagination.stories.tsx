import React from "react";
import { Pagination } from "./Pagination";

export default { component: Pagination, title: "Pagination" };

export const Default = () => (
  <Pagination pages={8} currentPage={1} setPage={() => {}} />
);
Default.story = { name: "default" };

export const NoPages = () => (
  <Pagination pages={0} currentPage={1} setPage={() => {}} />
);
NoPages.story = { name: "with zero pages" };

export const LotsOfPages = () => (
  <Pagination pages={187} currentPage={1} setPage={() => {}} />
);
LotsOfPages.story = { name: "with many pages" };
