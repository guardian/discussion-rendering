import { FilterOptions } from "./reducer";
import { DateFromISOStringC } from "io-ts-types/lib/DateFromISOString";
export interface UserProfile {
  userId: string;
  displayName: string;
  webUrl: string;
  apiUrl: string;
  avatar: string;
  secureAvatarUrl: string;
  badge: any[];
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
export interface DiscussionOptions {
  orderBy: "newest" | "oldest" | "mostrecommended";
  pageSize: number;
  displayThreaded: boolean;
  maxResponses: number;
  currentPage: number;
}
declare const getDiscussion: (
  shortURL: string,
  opts: FilterOptions
) => Promise<DiscussionResponse>;
declare const preview: (body: string) => Promise<string>;
declare const getProfile: () => Promise<UserProfile>;
declare const comment: (shortURL: string, body: string) => Promise<string>;
declare const reply: (
  shortURL: string,
  body: string,
  parentCommentId: number
) => Promise<string>;
declare const getPicks: (shortURL: string) => Promise<Comment[]>;
export declare const reportAbuse: ({
  commentId,
  categoryId,
  email,
  reason
}: {
  commentId: number;
  categoryId: number;
  reason?: string | undefined;
  email?: string | undefined;
}) => Promise<any>;
declare const recommend: (commentId: number) => Promise<string>;
export {
  getDiscussion,
  getProfile,
  preview,
  comment,
  reply,
  recommend,
  getPicks
};
