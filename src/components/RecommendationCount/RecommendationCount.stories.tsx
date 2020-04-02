import React from "react";
import { RecommendationCount } from "./RecommendationCount";

export default { title: "RecommendationCount" };

export const NeverRecomended = () => (
  <RecommendationCount
    pillar="sport"
    commentId={123}
    initialCount={383}
    alreadyRecommended={false}
  />
);
export const AlreadyRecomended = () => (
  <RecommendationCount
    pillar="sport"
    commentId={123}
    initialCount={83}
    alreadyRecommended={true}
  />
);
