/// <reference types="react" />
declare type Props = {
  commentId: number;
  initialCount: number;
  alreadyRecommended: boolean;
};
export declare const RecommendationCount: ({
  commentId,
  initialCount,
  alreadyRecommended
}: Props) => JSX.Element;
export {};
