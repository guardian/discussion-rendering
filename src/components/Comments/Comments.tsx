import React, { useState } from "react";
import { css } from "emotion";

import { Comment as CommentModel } from "../../lib/api";

// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

import { CommentList } from "../CommentList/CommentList";
import { Filters } from "../Filters/Filters";
import { CreateComment } from "../CreateComment/CreateComment";

type Props = {
  shortUrl: string;
};

const containerStyles = css`
  display: flex;
  flex-direction: row;
`;

export const Comments = () => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [filters, setFilters] = useState([]);

  const filtersUpdated = (filters: any) => {
    setFilters(filters);
    updateComments(filters);
  };

  const commentAdded = (comment: CommentModel) => {
    // Either we merge comments and this new comment or just make an
    // api call to refresh them all
  };

  const updateComments = (filters: any) => {
    // make an api call using filters and then setComments
  };
  return (
    <div className={containerStyles}>
      {/* CreateComment */}
      <CreateComment onAdd={commentAdded} />
      {/* TopPicks */}
      {/* Filters */}
      <Filters filters={filters} onChange={filtersUpdated} />
      {/* CommentsList */}
      <CommentList comments={comments} />
      {/* CreateComment */}
      <CreateComment onAdd={commentAdded} />
    </div>
  );
};
