import { Pillar, CAPIPillar } from '../types';

export const pillarToString = (pillar: Pillar): CAPIPillar => {
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
		case Pillar.Labs:
			return 'labs';
	}
};