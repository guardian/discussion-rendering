/// <reference types="react" />
import { Comment as CommentModel } from "../../lib/api";
declare type Props = {
  comments?: CommentModel[];
};
export declare const CommentList: ({ comments }: Props) => JSX.Element;
export {};
