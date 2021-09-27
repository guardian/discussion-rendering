import { ArticlePillar, ArticleTheme, ArticleSpecial } from '@guardian/libs';

import { CAPIPillar } from '../types';

export const pillarToEnum = (pillar: CAPIPillar): ArticleTheme => {
	switch (pillar) {
		case 'opinion':
			return ArticlePillar.Opinion;
		case 'culture':
			return ArticlePillar.Culture;
		case 'sport':
			return ArticlePillar.Sport;
		case 'lifestyle':
			return ArticlePillar.Lifestyle;
		case 'labs':
			return ArticleSpecial.Labs;
		case 'news':
		default:
			return ArticlePillar.News;
	}
};
