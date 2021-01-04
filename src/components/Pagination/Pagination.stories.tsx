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

export const WithBackground = () => {
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
WithBackground.story = {
    name: 'with a dark background',
    parameters: { backgrounds: { default: 'dark' } },
};

export const ThreePages = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={3}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={75}
        />
    );
};
ThreePages.story = { name: 'with three pages' };

export const FourPages = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={4}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={100}
        />
    );
};
FourPages.story = { name: 'with four pages' };

export const FivePages = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={5}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={124}
        />
    );
};
FivePages.story = { name: 'with five pages' };

export const SixPages = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={6}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={149}
        />
    );
};
SixPages.story = { name: 'with six pages' };

export const SevenPages = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={7}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={159}
        />
    );
};
SevenPages.story = { name: 'with seven pages' };

export const TwelvePages = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={12}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={DEFAULT_FILTERS}
            commentCount={288}
        />
    );
};
TwelvePages.story = { name: 'with twelve pages' };

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

export const WhenExpanded = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={4}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={{ ...DEFAULT_FILTERS, threads: 'expanded' }}
            commentCount={100}
        />
    );
};
WhenExpanded.story = { name: 'when expanded' };

export const WhenCollapsed = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={4}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={{ ...DEFAULT_FILTERS, threads: 'collapsed' }}
            commentCount={100}
        />
    );
};
WhenCollapsed.story = { name: 'when collapsed' };

export const WhenUnthreaded = () => {
    const [page, setCurrentPage] = useState(1);
    return (
        <Pagination
            totalPages={4}
            currentPage={page}
            setCurrentPage={setCurrentPage}
            filters={{ ...DEFAULT_FILTERS, threads: 'unthreaded' }}
            commentCount={100}
        />
    );
};
WhenUnthreaded.story = { name: 'when unthreaded' };
