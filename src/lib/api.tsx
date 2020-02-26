import {
  FilterOptions,
  DiscussionResponse,
  DiscussionOptions,
  UserProfile,
  CommentType,
  CommentResponse
} from "../types";

const baseURL = "https://discussion.code.dev-theguardian.com/discussion-api";

const objAsParams = (obj: any): string => {
  const params = Object.keys(obj)
    .map(key => {
      return `${key}=${obj[key]}`; // type issues here cannot be avoided
    })
    .join("&");

  return "?" + params;
};

const getDiscussion = (
  shortUrl: string,
  opts: FilterOptions
): Promise<DiscussionResponse> => {
  const apiOpts: DiscussionOptions = {
    orderBy: opts.orderBy,
    pageSize: opts.pageSize,
    displayThreaded: opts.threads !== "unthreaded",
    maxResponses: opts.threads === "collapsed" ? 3 : 100,
    page: opts.page
  };
  const params = objAsParams(apiOpts);

  const url = baseURL + `/discussion/${shortUrl}` + params;

  return fetch(url)
    .then(resp => resp.json())
    .catch(error => console.error(`Error fetching ${url}`, error));
};

const preview = (body: string): Promise<string> => {
  const url = baseURL + "/comment/preview";
  const data = new URLSearchParams();
  data.append("body", body);

  return fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(resp => resp.json())
    .then(json => json.commentBody)
    .catch(error => console.error(`Error fetching ${url}`, error));
};

const getProfile = (): Promise<UserProfile> => {
  const url = baseURL + "/profile/me";
  return fetch(url, { credentials: "include" })
    .then(resp => resp.json())
    .then(json => json.userProfile)
    .catch(error => console.error(`Error fetching ${url}`, error));
};

const comment = (shortUrl: string, body: string): Promise<CommentResponse> => {
  const url = baseURL + `/discussion/${shortUrl}/comment`;
  const data = new URLSearchParams();
  data.append("body", body);

  return fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include"
  })
    .then(resp => resp.json())
    .then(json => json);
};

const reply = (
  shortUrl: string,
  body: string,
  parentCommentId: number
): Promise<string> => {
  const url =
    baseURL + `/discussion/${shortUrl}/comment/${parentCommentId}/reply`;

  const data = new URLSearchParams();
  data.append("body", body);

  return fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    credentials: "include"
  })
    .then(resp => resp.json())
    .then(json => json.message);
};

const getPicks = (shortUrl: string): Promise<CommentType[]> => {
  const url = baseURL + `/discussion/${shortUrl}/topcomments`;
  return fetch(url)
    .then(resp => resp.json())
    .then(json => json.discussion.comments)
    .catch(error => console.error(`Error fetching ${url}`, error));
};

export const reportAbuse = ({
  commentId,
  categoryId,
  email,
  reason
}: {
  commentId: number;
  categoryId: number;
  reason?: string;
  email?: string;
}) => {
  const url = baseURL + `/comment/${commentId}/reportAbuse`;

  const data = new URLSearchParams();
  data.append("categoryId", categoryId.toString());
  email && data.append("email", email.toString());
  reason && data.append("reason", reason);

  return fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(resp => resp.json());
};

const recommend = (commentId: number): Promise<boolean> => {
  const url = baseURL + `/comment/${commentId}/recommend`;

  return fetch(url, { method: "POST", credentials: "include" }).then(
    resp => resp.ok
  );
};

export const getCommentCount = (
  shortUrl: string
): Promise<{ shortUrl: string; numberOfComments: number }> => {
  const url = `${baseURL}/discussion/${shortUrl}/comments/count`;
  return fetch(url)
    .then(resp => resp.json())
    .catch(error => console.error(`Error fetching ${url}`, error));
};

export {
  getDiscussion,
  getProfile,
  preview,
  comment,
  reply,
  recommend,
  getPicks
};
