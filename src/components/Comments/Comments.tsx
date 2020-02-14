import React, { useState, useEffect } from "react";
import { css } from "emotion";

import {
  Comment as CommentModel,
  DiscussionOptions,
  DiscussionResponse
} from "../../lib/api";

// import { textSans } from "@guardian/src-foundations/typography";
// import { palette } from "@guardian/src-foundations";

import { CommentList } from "../CommentList/CommentList";
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
    maxResponses: 3
  };
  const params = objAsParams(apiOpts);
  const url = baseURL + `/discussion/${shortURL}` + params;

  return fetch(url)
    .then(resp => resp.json())
    .catch(error => console.error(`Error fetching ${url}`, error));
};

export const Comments = ({ shortUrl }: Props) => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilterOptions);
  const [loading, setLoading] = useState<boolean>(true);

  const filtersUpdated = (filters: FilterOptions) => {
    setFilters(filters);
  };

  const commentAdded = (comment: CommentModel) => {
    // Either we merge comments and this new comment or just make an
    // api call to refresh them all
  };

  useEffect(() => {
    setLoading(true);
    getDiscussion(shortUrl, filters).then(json => {
      setLoading(false);
      setComments(json.discussion.comments);
    });
  }, [filters]);

  return (
    <div className={containerStyles}>
      {/* <CreateComment onAdd={commentAdded} /> */}
      {/* TopPicks */}
      <Filters filters={filters} setFilters={filtersUpdated} />
      {loading ? (
        <p>TODO loading component goes here...</p>
      ) : (
        <CommentList comments={comments} />
      )}
      {/* <CreateComment onAdd={commentAdded} /> */}
    </div>
  );
};
