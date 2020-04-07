import React, { useState } from 'react';
import { Pagination } from './Pagination';

import { FilterOptions } from '../../types';

export default { component: Pagination, title: 'Pagination' };

const DEFAULT_FILTERS: FilterOptions = {
    orderBy: 'newest',
    pageSize: 25,
    threads: 'collapsed',
};

export const Default = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={9}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={200}
        />
    );
};
Default.story = { name: 'default' };

export const NoPages = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={2}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={56}
        />
    );
};
NoPages.story = { name: 'with two pages' };

export const LotsOfPages = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={187}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={490000}
        />
    );
};
LotsOfPages.story = { name: 'with many pages' };
