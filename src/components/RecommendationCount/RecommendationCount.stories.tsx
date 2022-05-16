import React from 'react';
import { RecommendationCount } from './RecommendationCount';

export default { title: 'RecommendationCount' };

export const NeverRecommended = () => (
	<RecommendationCount
		commentId={123}
		initialCount={383}
		isSignedIn={true}
		userMadeComment={false}
	/>
);

export const NotSignedIn = () => (
	<RecommendationCount
		commentId={123}
		initialCount={83}
		isSignedIn={false}
		userMadeComment={false}
	/>
);

export const OwnPost = () => (
	<RecommendationCount
		commentId={123}
		initialCount={83}
		isSignedIn={false}
		userMadeComment={true}
	/>
);
