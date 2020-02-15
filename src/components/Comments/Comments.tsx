import React, { useState, useEffect } from "react";
import { css } from "emotion";

import { Comment as CommentModel, getDiscussion } from "../../lib/api";

import { CommentList } from "../CommentList/CommentList";
import { TopPicks } from "../TopPicks/TopPicks";
import { Filters } from "../Filters/Filters";
import { CommentForm } from "../CommentForm/CommentForm";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<number>(0);

  const filtersUpdated = (filters: FilterOptions) => {
    setFilters(filters);
  };

  const commentAdded = () => {
    setLoading(true);
    getDiscussion(shortUrl, filters).then(json => {
      setLoading(false);
      setComments(json.discussion.comments);
      setPages(json.pages);
    });
  };

  useEffect(() => {
    setLoading(true);
    getDiscussion(shortUrl, filters).then(json => {
      setLoading(false);
      setComments(json.discussion.comments);
      setPages(json.pages);
    });
  }, [filters, shortUrl]);

  return (
    <div className={containerStyles}>
      <CommentForm shortUrl={shortUrl} onAdd={commentAdded} />
      <TopPicks shortUrl={shortUrl} />
      <Filters filters={filters} setFilters={filtersUpdated} pages={pages} />
      {loading ? (
        <p>TODO loading component goes here...</p>
      ) : (
        <CommentList comments={comments} />
      )}
      <CommentForm shortUrl={shortUrl} onAdd={commentAdded} />
    </div>
  );
};
