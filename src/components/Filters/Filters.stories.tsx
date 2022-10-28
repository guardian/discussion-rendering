import { useState } from 'react';

import { ArticlePillar } from '@guardian/libs';

import { FilterOptions } from '../../types';

import { Filters } from './Filters';

export default { title: 'Filters' };

export const Default = () => {
	const [filters, setFilters] = useState<FilterOptions>({
		orderBy: 'newest',
		pageSize: 25,
		threads: 'collapsed',
	});
	return (
		<Filters
			pillar={ArticlePillar.Culture}
			filters={filters}
			onFilterChange={setFilters}
			totalPages={5}
			commentCount={74}
		/>
	);
};
Default.story = { name: 'default' };
