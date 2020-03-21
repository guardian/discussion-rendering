export type Pillar = "news" | "opinion" | "sport" | "culture" | "lifestyle";

export interface CommentType {
  id: number;
  body: string;
  date: string;
  isoDateTime: string;
  status: string;
  webUrl: string;
  apiUrl: string;
  numResponses?: number;
  numRecommends: number;
  isHighlighted: boolean;
  userProfile: UserProfile;
  responseTo?: {
    displayName: string;
    commentApiUrl: string;
    isoDateTime: string;
    date: string;
    commentId: number;
    commentWebUrl: string;
  };
  responses?: CommentType[];
  metaData?: {
    commentCount: number;
    staffCommenterCount: number;
    editorsPickCount: number;
    blockedCount: number;
    responseCount: number;
  };
}

export type CommentResponse = {
  status: "ok" | "error";
  statusCode: number;
  message: string;
  errorCode?: string;
};

type UserNameError = {
  message: string;
  description: string;
  context: string;
};

type UserConsents = {
  id: string;
  actor: string;
  version: number;
  consented: boolean;
  timestamp: string;
  privacyPolicyVersion: number;
};

type UserGroups = {
  path: string;
  packageCode: string;
};

type UserNameUser = {
  dates: { accountCreatedDate: string };
  consents: UserConsents[];
  userGroups: UserGroups[];
  publicFields: {
    username: string;
    displayName: string;
  };
  statusFields: {
    userEmailValidated: boolean;
    allowThirdPartyProfiling: boolean;
  };
  privateFields: {
    brazeUuid: string;
    legacyPackages: string;
    legacyProducts: string;
  };
  primaryEmailAddress: string;
  id: string;
  hasPassword: boolean;
};

export type UserNameResponse = {
  status: "ok" | "error";
  user: UserNameUser;
  errors?: UserNameError[];
};

export type OrderByType = "newest" | "oldest" | "mostrecommended";
export type ThreadsType = "collapsed" | "expanded" | "unthreaded";

export interface FilterOptions {
  orderBy: OrderByType;
  pageSize: number;
  threads: ThreadsType;
}

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

export interface DiscussionResponse {
  status: string;
  page: number;
  pages: number;
  pageSize: number;
  orderBy: string;
  discussion: {
    key: string;
    webUrl: string;
    apiUrl: string;
    commentCount: number;
    topLevelCommentCount: number;
    isClosedForComments: boolean;
    isClosedForRecommendation: boolean;
    isThreaded: boolean;
    title: string;
    comments: CommentType[];
  };
}

export interface DiscussionOptions {
  orderBy: OrderByType;
  pageSize: number;
  displayThreaded: boolean;
  maxResponses: number;
  page: number;
}

export type AdditionalHeadersType = { [key: string]: string };

export type DropdownOptionType = {
  value: string;
  title: string;
  isActive?: boolean;
};
