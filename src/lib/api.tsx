import { FilterOptions } from "./reducer"; // TODO this should live here
import { DateFromISOStringC } from "io-ts-types/lib/DateFromISOString";

export interface UserProfile {
  userId: string;
  displayName: string;
  webUrl: string;
  apiUrl: string;
  avatar: string;
  secureAvatarUrl: string;
  badge: any[];

  // only included from /profile/me endpoint
  privateFields?: {
    canPostComment: boolean;
    isPremoderated: boolean;
    hasCommented: boolean;
  };
}

interface ResponseTo {
  displayName: string;
  commentApiUrl: string;
  isoDateTime: DateFromISOStringC;
  date: string;
  commentId: number;
  commentWebUrl: string;
}

export interface CommentMetadata {
  commentCount: number;
  staffCommenterCount: number;
  editorsPickCount: number;
  blockedCount: number;
  responseCount: number;
}

export interface Comment {
  id: number;
  body: string;
  date: string;
  isoDateTime: DateFromISOStringC;
  status: string;
  webUrl: string;
  apiUrl: string;
  numResponses?: number;
  numRecommends: number;
  isHighlighted: boolean;
  userProfile: UserProfile;
  responseTo?: ResponseTo;
  responses?: Comment[];
  metaData?: CommentMetadata;
}

interface Discussion {
  key: string;
  webUrl: string;
  apiUrl: string;
  commentCount: number;
  topLevelCommentCount: number;
  isClosedForComments: boolean;
  isClosedForRecommendation: boolean;
  isThreaded: boolean;
  title: string;
  comments: Comment[];
}

export interface DiscussionResponse {
  status: string;
  currentPage: number;
  pages: number;
  pageSize: number;
  orderBy: string;
  discussion: Discussion;
}

interface DiscussionOptions {
  orderBy: "newest" | "oldest" | "mostrecommended";
  pageSize: number;
  displayThreaded: boolean;
  maxResponses: number;
}

/* const defaultDiscussionOptions: DiscussionOptions = {
  orderBy: "newest",
  pageSize: 20,
  displayThreaded: false,
  maxResponses: 3
}; */

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

const comment = (shortURL: string, body: string): Promise<string> => {
  const url = baseURL + `/discussion/${shortURL}/comment`;
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

const reply = (
  shortURL: string,
  body: string,
  parentCommentId: number
): Promise<string> => {
  const url =
    baseURL + `/discussion/${shortURL}/comment/${parentCommentId}/reply`;

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

const getPicks = (shortURL: string): Promise<Comment[]> => {
  const url = baseURL + `/discussion/${shortURL}/topcomments`;

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
  })
    .then(resp => resp.json())
    .then(json => json.message);
};

const recommend = (commentId: number): Promise<string> => {
  const url = baseURL + `/comment/${commentId}/recommend`;

  return fetch(url, { method: "POST" })
    .then(resp => resp.json())
    .then(json => json.message); // note message isn't very useful for this endpoint
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
