interface UserProfile {
  userId: string;
  displayName: string;
  webUrl: string;
  apiUrl: string;
  avatar: string;
  secureAvatarUrl: string;
  badge: any[];
}

interface ResponseTo {
  displayName: string;
  commentApiUrl: string;
  isoDateTime: Date;
  date: string;
  commentId: string;
  commentWebUrl: string;
}

export interface Comment {
  id: number;
  body: string;
  date: string;
  isoDateTime: Date;
  status: string;
  webUrl: string;
  apiUrl: string;
  numResponses: number;
  numRecommends: number;
  isHighlighted: boolean;
  userProfile: UserProfile;
  responseTo: ResponseTo;
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

export interface DiscussionOptions {
  orderBy: "newest" | "oldest" | "mostrecommended";
  pageSize: number;
  displayThreaded: boolean;
  maxResponses: number;
}

const defaultDiscussionOptions: DiscussionOptions = {
  orderBy: "newest",
  pageSize: 20,
  displayThreaded: false,
  maxResponses: 3
};

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
  opts: DiscussionOptions
): Promise<DiscussionResponse> => {
  const params = objAsParams(opts);
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

const getProfile = () => {
  const url = baseURL + "/profile/me";
  return fetch(url, { credentials: "include" })
    .then(resp => resp.json())
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
    }
  })
    .then(resp => resp.json())
    .then(json => json.message);
};

const reply = (
  shortURL: string,
  body: string,
  parentCommentID: string
): Promise<string> => {
  const url =
    baseURL + `/discussion/${shortURL}/comment/${parentCommentID}/reply`;

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
    .then(json => json.message);
};

const reportAbuse = (
  commentID: string,
  categoryID: number,
  reason?: string
) => {
  const url = baseURL + `/comment/${commentID}/reportAbuse`;

  const data = new URLSearchParams();
  data.append("categoryId", categoryID.toString());
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

const recommend = (commentID: string): Promise<string> => {
  const url = baseURL + `/comment/${commentID}/recommend`;

  return fetch(url, { method: "POST" })
    .then(resp => resp.json())
    .then(json => json.message); // note message isn't very useful for this endpoint
};

export {
  getDiscussion,
  defaultDiscussionOptions,
  getProfile,
  preview,
  comment,
  reply,
  recommend
};
