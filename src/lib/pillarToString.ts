import { ArticlePillar, ArticleSpecial, ArticleTheme } from '@guardian/libs';

import { CAPIPillar } from '../types';

export const pillarToString = (pillar: ArticleTheme): CAPIPillar => {
	switch (pillar) {
		case ArticlePillar.News:
			return 'news';
		case ArticlePillar.Opinion:
			return 'opinion';
		case ArticlePillar.Culture:
			return 'culture';
		case ArticlePillar.Sport:
			return 'sport';
		case ArticlePillar.Lifestyle:
			return 'lifestyle';
		case ArticleSpecial.Labs:
			return 'labs';
		default:
			return 'news';
	}
};
