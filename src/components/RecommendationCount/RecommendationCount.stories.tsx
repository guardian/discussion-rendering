import React from 'react';
import { RecommendationCount } from './RecommendationCount';

export default { title: 'RecommendationCount' };

export const NeverRecomended = () => (
    <RecommendationCount
        commentId={123}
        initialCount={383}
        alreadyRecommended={false}
        isSignedIn={true}
    />
);

export const AlreadyRecomended = () => (
    <RecommendationCount
        commentId={123}
        initialCount={83}
        alreadyRecommended={true}
        isSignedIn={true}
    />
);

export const NotSignedIn = () => (
    <RecommendationCount
        commentId={123}
        initialCount={83}
        alreadyRecommended={false}
        isSignedIn={false}
    />
);
