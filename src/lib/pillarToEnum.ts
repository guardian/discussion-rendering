import { Pillar, Theme, Special } from '@guardian/types';

import { CAPIPillar } from '../types';

export const pillarToEnum = (pillar: CAPIPillar): Theme => {
	switch (pillar) {
		case 'opinion':
			return Pillar.Opinion;
		case 'culture':
			return Pillar.Culture;
		case 'sport':
			return Pillar.Sport;
		case 'lifestyle':
			return Pillar.Lifestyle;
		case 'labs':
			return Special.Labs;
		case 'news':
		default:
			return Pillar.News;
	}
};
