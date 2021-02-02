import { useState } from 'react';

import { Pillar } from '@guardian/types';

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
			pillar={Pillar.Culture}
			filters={filters}
			onFilterChange={setFilters}
			totalPages={5}
			commentCount={74}
		/>
	);
};
Default.story = { name: 'default' };
