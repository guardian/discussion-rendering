import React, { useState } from "react";
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

  console.log("url", url);

  return fetch(url)
    .then(resp => resp.json())
    .catch(error => console.error(`Error fetching ${url}`, error));
};

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
    getDiscussion(shortUrl, filters).then(json => {
      console.log("json:", json);
      setComments(json.discussion.comments);
    });
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
