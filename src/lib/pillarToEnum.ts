import { Pillar } from '@guardian/types';

import { CAPIPillar } from '../types';

export const pillarToEnum = (pillar: CAPIPillar): Pillar => {
	switch (pillar) {
		case 'news':
			return Pillar.News;
		case 'opinion':
			return Pillar.Opinion;
		case 'culture':
			return Pillar.Culture;
		case 'sport':
			return Pillar.Sport;
		case 'lifestyle':
			return Pillar.Lifestyle;
		case 'labs':
			return Pillar.News;
	}
};
