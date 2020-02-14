import React, { useState, useEffect } from "react";
import { css } from "emotion";

import {
  Comment as CommentModel,
  DiscussionOptions,
  DiscussionResponse
} from "../../lib/api";

import { CommentList } from "../CommentList/CommentList";
import { TopPicks } from "../TopPicks/TopPicks";
import { Filters } from "../Filters/Filters";
// import { CreateComment } from "../CreateComment/CreateComment";

import { FilterOptions, defaultFilterOptions } from "../Filters/Filters";

type Props = {
  shortUrl: string;
};

const baseURL = "https://discussion.code.dev-theguardian.com/discussion-api";

const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

const objAsParams = (obj: any): string => {
  const params = Object.keys(obj)
    .map(key => {
      return `${key}=${obj[key]}`; // type issues here cannot be avoided
    })
    .join("&");

  return "?" + params;
};

const getDiscussion = (
  shortURL: string,
  opts: FilterOptions
): Promise<DiscussionResponse> => {
  const apiOpts: DiscussionOptions = {
    orderBy: opts.orderBy,
    pageSize: opts.pageSize,
    displayThreaded: opts.threads !== "unthreaded",
    maxResponses: 3,
    currentPage: opts.currentPage
  };
  const params = objAsParams(apiOpts);
  const url = baseURL + `/discussion/${shortURL}` + params;

  console.log("url", url);

  return fetch(url)
    .then(resp => resp.json())
    .catch(error => console.error(`Error fetching ${url}`, error));
};

export const Comments = ({ shortUrl }: Props) => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilterOptions);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState<number>(0);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const filtersUpdated = (filters: FilterOptions) => {
    setFilters(filters);
  };

  // const pageUpdated = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  const commentAdded = (comment: CommentModel) => {
    // Either we merge comments and this new comment or just make an
    // api call to refresh them all
  };

  useEffect(() => {
    setLoading(true);
    console.log("effect filters", filters);
    getDiscussion(shortUrl, filters).then(json => {
      console.log("json", json);
      setLoading(false);
      setComments(json.discussion.comments);
      setPages(json.pages);
    });
  }, [filters]);

  return (
    <div className={containerStyles}>
      {/* <CreateComment onAdd={commentAdded} /> */}
      <TopPicks />
      <Filters filters={filters} setFilters={filtersUpdated} pages={pages} />
      {loading ? (
        <p>TODO loading component goes here...</p>
      ) : (
        <CommentList comments={comments} />
      )}
      {/* <CreateComment onAdd={commentAdded} /> */}
    </div>
  );
};
