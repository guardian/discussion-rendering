import React, { useState, useEffect } from 'react';
import { css } from 'emotion';

import {
    CommentType,
    FilterOptions,
    UserProfile,
    AdditionalHeadersType,
    PageSizeType,
    OrderByType,
    Pillar,
} from './types';
import { getDiscussion, getPicks, initialiseApi } from './lib/api';
import { CommentContainer } from './components/CommentContainer/CommentContainer';
import { TopPicks } from './components/TopPicks/TopPicks';
import { CommentForm } from './components/CommentForm/CommentForm';
import { Filters } from './components/Filters/Filters';
import { Pagination } from './components/Pagination/Pagination';
import { LoadingComments } from './components/LoadingComments/LoadingComments';
import { Column } from './components/Column/Column';
import { PillarButton } from './components/PillarButton/PillarButton';

type Props = {
    shortUrl: string;
    baseUrl: string;
    pillar: Pillar;
    isClosedForComments: boolean;
    commentToScrollTo?: number;
    initialPage?: number;
    pageSizeOverride?: PageSizeType;
    orderByOverride?: OrderByType;
    user?: UserProfile;
    additionalHeaders: AdditionalHeadersType;
    expanded: boolean;
};

const footerStyles = css`
    display: flex;
    justify-content: flex-end;
`;

const commentContainerStyles = css`
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding-left: 0;
    margin: 0;
`;

const picksWrapper = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const DEFAULT_FILTERS: FilterOptions = {
    orderBy: 'newest',
    pageSize: 25,
    threads: 'collapsed',
};

const PlusSVG = () => (
    <svg width="18" height="18">
        <path d="M8.2 0h1.6l.4 7.8 7.8.4v1.6l-7.8.4-.4 7.8H8.2l-.4-7.8L0 9.8V8.2l7.8-.4.4-7.8z"></path>
    </svg>
);

const rememberFilters = (filtersToRemember: FilterOptions) => {
    try {
        localStorage.setItem(
            'gu.prefs.discussion.threading',
            JSON.stringify({ value: filtersToRemember.threads }),
        );
        localStorage.setItem(
            'gu.prefs.discussion.pagesize',
            JSON.stringify({ value: filtersToRemember.pageSize }),
        );
        localStorage.setItem(
            'gu.prefs.discussion.order',
            JSON.stringify({ value: filtersToRemember.orderBy }),
        );
    } catch (error) {
        // Sometimes it's not possible to access localStorage, we accept this and don't want to
        // capture these errors
    }
};

const initialiseFilters = ({
    pageSizeOverride,
    orderByOverride,
    permalinkBeingUsed,
}: {
    pageSizeOverride?: PageSizeType;
    orderByOverride?: OrderByType;
    permalinkBeingUsed: boolean;
}) => {
    const initialisedFilters = initFiltersFromLocalStorage();
    return {
        ...initialisedFilters,
        // Override if prop given
        pageSize: pageSizeOverride || initialisedFilters.pageSize,
        orderBy: orderByOverride || initialisedFilters.orderBy,
        threads:
            initialisedFilters.threads === 'collapsed' && permalinkBeingUsed
                ? 'expanded'
                : initialisedFilters.threads,
    };
};

const initFiltersFromLocalStorage = (): FilterOptions => {
    let threads;
    let pageSize;
    let orderBy;

    try {
        // Try to read from local storage
        orderBy = localStorage.getItem('gu.prefs.discussion.order');
        threads = localStorage.getItem('gu.prefs.discussion.threading');
        pageSize = localStorage.getItem('gu.prefs.discussion.pagesize');
    } catch (error) {
        return DEFAULT_FILTERS;
    }

    // If we found something in LS, use it, otherwise return defaults
    return {
        orderBy: orderBy ? JSON.parse(orderBy).value : DEFAULT_FILTERS.orderBy,
        threads: threads ? JSON.parse(threads).value : DEFAULT_FILTERS.threads,
        pageSize: pageSize
            ? JSON.parse(pageSize).value
            : DEFAULT_FILTERS.pageSize,
    };
};

const readMutes = (): string[] => {
    let mutes;
    try {
        // Try to read from local storage
        mutes = localStorage.getItem('gu.prefs.discussion.mutes');
    } catch (error) {
        return [];
    }

    return mutes ? JSON.parse(mutes).value : [];
};

const writeMutes = (mutes: string[]) => {
    try {
        localStorage.setItem(
            'gu.prefs.discussion.mutes',
            JSON.stringify({ value: mutes }),
        );
    } catch (error) {
        // Sometimes it's not possible to access localStorage, we accept this and don't want to
        // capture these errors
    }
};

export const App = ({
    baseUrl,
    shortUrl,
    pillar,
    isClosedForComments,
    initialPage,
    commentToScrollTo,
    pageSizeOverride,
    orderByOverride,
    user,
    additionalHeaders,
    expanded,
}: Props) => {
    const [filters, setFilters] = useState<FilterOptions>(
        initialiseFilters({
            pageSizeOverride,
            orderByOverride,
            permalinkBeingUsed: !!commentToScrollTo,
        }),
    );
    const [isExpanded, setIsExpanded] = useState<boolean>(expanded);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(initialPage || 1);
    const [picks, setPicks] = useState<CommentType[]>([]);
    const [commentBeingRepliedTo, setCommentBeingRepliedTo] = useState<
        CommentType
    >();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [commentCount, setCommentCount] = useState<number>(0);
    const [mutes, setMutes] = useState<string[]>(readMutes());

    useEffect(() => {
        setLoading(true);
        getDiscussion(shortUrl, { ...filters, page }).then(json => {
            setLoading(false);
            if (json?.status !== 'error') {
                setComments(json?.discussion?.comments);
                setCommentCount(json?.discussion?.topLevelCommentCount);
            }
            setTotalPages(json?.pages);
        });
    }, [filters, page, shortUrl]);

    useEffect(() => {
        const fetchPicks = async () => {
            const json = await getPicks(shortUrl);
            setPicks(json);
        };
        fetchPicks();
    }, [shortUrl]);

    // If these override props are updated we want to respect them
    useEffect(() => {
        setFilters(oldFilters => {
            return {
                ...oldFilters,
                orderBy: orderByOverride ? orderByOverride : oldFilters.orderBy,
                pageSize: pageSizeOverride
                    ? pageSizeOverride
                    : oldFilters.pageSize,
            };
        });
    }, [pageSizeOverride, orderByOverride]);

    // Keep initialPage prop in sync with page
    useEffect(() => {
        if (initialPage) setPage(initialPage);
    }, [initialPage]);

    // Check if there is a comment to scroll to and if
    // so, scroll to the div with this id.
    // We need to do this in javascript like this because the comments list isn't
    // loaded on the inital page load and only gets added to the dom later, after
    // an api call is made.
    useEffect(() => {
        if (commentToScrollTo) {
            const commentElement = document.getElementById(
                `comment-${commentToScrollTo}`,
            );
            commentElement && commentElement.scrollIntoView();
        }
    }, [comments, commentToScrollTo]); // Add comments to deps so we rerun this effect when comments are loaded

    const onFilterChange = (newFilterObject: FilterOptions) => {
        // If we're reducing the pageSize then we may need to override the page we're on to prevent making
        // requests for pages that don't exist.
        // E.g. If we used to have 102 comments and a pageSize of 25 then the current page could be 5 (showing 2
        // comments). If we then change pageSize to be 50 then there is no longer a page 5 and trying to ask for it
        // from the api would return an error so, in order to respect the readers desire to be on the last page, we
        // need to work out the maximum page possible and use that instead.
        let maxPagePossible = Math.floor(
            commentCount / newFilterObject.pageSize,
        );
        // Add 1 if there is a remainder
        if (commentCount % newFilterObject.pageSize) {
            maxPagePossible = maxPagePossible + 1;
        }
        // Check
        if (page > maxPagePossible) setPage(maxPagePossible);

        rememberFilters(newFilterObject);
        setFilters(newFilterObject);
    };

    const onPageChange = (page: number) => {
        document.getElementById('comment-filters')?.scrollIntoView();
        setPage(page);
    };

    const toggleMuteStatus = (userId: string) => {
        let updatedMutes;
        if (mutes.includes(userId)) {
            // Already muted, unmute them
            updatedMutes = mutes.filter(id => id !== userId);
        } else {
            // Add this user to our list of mutes
            updatedMutes = [...mutes, userId];
        }
        // Update local state
        setMutes(updatedMutes);
        // Remember these new values
        writeMutes(updatedMutes);
    };

    const onAddComment = (comment: CommentType) => {
        comments.pop(); // Remove last item from our local array
        // Replace it with this new comment at the start
        setComments([comment, ...comments]);
    };

    initialiseApi({ additionalHeaders, baseUrl });

    const showPagination = totalPages > 1;

    if (!isExpanded) {
        return (
            <div className={commentContainerStyles}>
                {user && !isClosedForComments && (
                    <CommentForm
                        pillar={pillar}
                        shortUrl={shortUrl}
                        onAddComment={onAddComment}
                        user={user}
                    />
                )}
                {picks && picks.length ? (
                    <div className={picksWrapper}>
                        {!!picks.length && (
                            <TopPicks
                                baseUrl={baseUrl}
                                pillar={pillar}
                                comments={picks.slice(0, 2)}
                                isSignedIn={!!user}
                            />
                        )}
                    </div>
                ) : (
                    <>
                        {loading ? (
                            <LoadingComments />
                        ) : !comments.length ? (
                            <p>TODO: No comment component goes here</p>
                        ) : (
                            <ul className={commentContainerStyles}>
                                {comments.slice(0, 2).map(comment => (
                                    <li key={comment.id}>
                                        <CommentContainer
                                            baseUrl={baseUrl}
                                            comment={comment}
                                            pillar={pillar}
                                            isClosedForComments={
                                                isClosedForComments
                                            }
                                            shortUrl={shortUrl}
                                            user={user}
                                            threads={filters.threads}
                                            commentBeingRepliedTo={
                                                commentBeingRepliedTo
                                            }
                                            setCommentBeingRepliedTo={
                                                setCommentBeingRepliedTo
                                            }
                                            mutes={mutes}
                                            toggleMuteStatus={toggleMuteStatus}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
                <div
                    className={css`
                        width: 250px;
                    `}
                >
                    <PillarButton
                        pillar={pillar}
                        onClick={() => setIsExpanded(true)}
                        icon={<PlusSVG />}
                        iconSide="left"
                    >
                        View more comments
                    </PillarButton>
                </div>
            </div>
        );
    }

    return (
        <Column>
            <>
                {user && !isClosedForComments && (
                    <CommentForm
                        pillar={pillar}
                        shortUrl={shortUrl}
                        onAddComment={onAddComment}
                        user={user}
                    />
                )}
                {!!picks.length && (
                    <TopPicks
                        baseUrl={baseUrl}
                        pillar={pillar}
                        comments={picks}
                        isSignedIn={!!user}
                    />
                )}
                <Filters
                    pillar={pillar}
                    filters={filters}
                    onFilterChange={onFilterChange}
                    totalPages={totalPages}
                    commentCount={commentCount}
                />
                {showPagination && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={page}
                        setCurrentPage={(newPage: number) => {
                            onPageChange(newPage);
                        }}
                        commentCount={commentCount}
                        filters={filters}
                    />
                )}
                {loading ? (
                    <LoadingComments />
                ) : !comments.length ? (
                    <p>TODO: No comment component goes here</p>
                ) : (
                    <ul className={commentContainerStyles}>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <CommentContainer
                                    baseUrl={baseUrl}
                                    comment={comment}
                                    pillar={pillar}
                                    isClosedForComments={isClosedForComments}
                                    shortUrl={shortUrl}
                                    user={user}
                                    threads={filters.threads}
                                    commentBeingRepliedTo={
                                        commentBeingRepliedTo
                                    }
                                    setCommentBeingRepliedTo={
                                        setCommentBeingRepliedTo
                                    }
                                    commentToScrollTo={commentToScrollTo}
                                    mutes={mutes}
                                    toggleMuteStatus={toggleMuteStatus}
                                />
                            </li>
                        ))}
                    </ul>
                )}
                {showPagination && (
                    <footer className={footerStyles}>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={page}
                            setCurrentPage={(newPage: number) => {
                                onPageChange(newPage);
                            }}
                            commentCount={commentCount}
                            filters={filters}
                        />
                    </footer>
                )}
            </>
        </Column>
    );
};
