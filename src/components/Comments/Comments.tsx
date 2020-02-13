import React, { useState } from "react";
import { css } from "emotion";

import { Comment as CommentModel } from "../../lib/api";

// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

import { CommentList } from "../CommentList/CommentList";
import { Filters } from "../Filters/Filters";
import { CreateComment } from "../CreateComment/CreateComment";

import { FilterOptions, defaultFilterOptions } from "../Filters/Filters";

type Props = {
  shortUrl: string;
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const Comments = ({ shortUrl }: Props) => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilterOptions);

  const filtersUpdated = (filters: FilterOptions) => {
    setFilters(filters);
    updateComments(filters);
  };

  const commentAdded = (comment: CommentModel) => {
    // Either we merge comments and this new comment or just make an
    // api call to refresh them all
  };

  const updateComments = (filters: FilterOptions) => {
    // make an api call using filters and then setComments
    console.log(`Make an api call using ${JSON.stringify(filters)}`);
  };

  return (
    <div className={containerStyles}>
      {/* CreateComment */}
      {/* <CreateComment onAdd={commentAdded} /> */}
      {/* TopPicks */}
      {/* Filters */}
      <Filters filters={filters} setFilters={filtersUpdated} />
      {/* CommentsList */}
      <CommentList comments={comments} />
      {/* CreateComment */}
      {/* <CreateComment onAdd={commentAdded} /> */}
    </div>
  );
};
