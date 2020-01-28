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

interface DiscussionOptions {
  orderBy: "newest" | "oldest" | "popular";
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

const baseURL = "https://discussion.theguardian.com/discussion-api";

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

const getProfile = () => {
  const url = baseURL + "/profile/me";
  return fetch(url, { credentials: "include" })
    .then(resp => resp.json())
    .catch(error => console.error(`Error fetching ${url}`, error));
};

const reportAbuse = () => {};

const recommend = (commentID: string) => {};

export { getDiscussion, defaultDiscussionOptions, getProfile };
