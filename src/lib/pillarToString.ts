import { Pillar, Special, Theme } from '@guardian/types';

import { CAPIPillar } from '../types';

export const pillarToString = (pillar: Theme): CAPIPillar => {
	switch (pillar) {
		case Pillar.News:
			return 'news';
		case Pillar.Opinion:
			return 'opinion';
		case Pillar.Culture:
			return 'culture';
		case Pillar.Sport:
			return 'sport';
		case Pillar.Lifestyle:
			return 'lifestyle';
		case Special.Labs:
			return 'labs';
		default:
			return 'news';
	}
};
