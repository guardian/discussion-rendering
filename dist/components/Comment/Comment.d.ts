/// <reference types="react" />
import { Comment as CommentModel } from "../../lib/api";
import { Pillar } from "../../types";
declare type Props = {
  comment: CommentModel;
  pillar: Pillar;
  nested?: boolean;
};
export declare const avatar: (avatarSize: number) => string;
export declare const Comment: ({
  comment,
  pillar,
  nested
}: Props) => JSX.Element;
export {};
