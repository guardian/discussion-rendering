import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

import { neutral, textSans, space } from '@guardian/source-foundations';

import { ArticleTheme } from '@guardian/libs';

import {
	CommentType,
	FilterOptions,
	UserProfile,
	AdditionalHeadersType,
	PageSizeType,
	OrderByType,
	CommentResponse,
} from './types';
import { getDiscussion, getPicks, initialiseApi } from './lib/api';
import { CommentContainer } from './components/CommentContainer/CommentContainer';
import { TopPicks } from './components/TopPicks/TopPicks';
import { CommentForm } from './components/CommentForm/CommentForm';
import { Filters } from './components/Filters/Filters';
import { Pagination } from './components/Pagination/Pagination';
import { LoadingComments } from './components/LoadingComments/LoadingComments';

type Props = {
	shortUrl: string;
	baseUrl: string;
	pillar: ArticleTheme;
	isClosedForComments: boolean;
	commentToScrollTo?: number;
	initialPage?: number;
	pageSizeOverride?: PageSizeType;
	orderByOverride?: OrderByType;
	user?: UserProfile;
	additionalHeaders: AdditionalHeadersType;
	expanded: boolean;
	onPermalinkClick: (commentId: number) => void;
	apiKey: string;
	onRecommend?: (commentId: number) => Promise<Boolean>;
	onComment?: (shortUrl: string, body: string) => Promise<CommentResponse>;
	onReply?: (
		shortUrl: string,
		body: string,
		parentCommentId: number,
	) => Promise<CommentResponse>;
	onPreview?: (body: string) => Promise<string>;
	onExpand?: () => void;
};

const footerStyles = css`
	display: flex;
	justify-content: flex-end;
`;

const commentColumnWrapperStyles = css`
	display: flex;
	flex-direction: column;
	max-width: 100%;
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
	pageSize: 100,
	threads: 'collapsed',
};

const NoComments = () => (
	<div
		css={css`
			color: ${neutral[46]};
			${textSans.small()}
			padding-top: ${space[5]}px;
			padding-left: ${space[1]}px;
			padding-bottom: ${space[9]}px;
		`}
	>
		No comments found
	</div>
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
	isClosedForComments,
}: {
	pageSizeOverride?: PageSizeType;
	orderByOverride?: OrderByType;
	permalinkBeingUsed: boolean;
	isClosedForComments: boolean;
}) => {
	const initialisedFilters = initFiltersFromLocalStorage({
		isClosedForComments,
	});
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

const initFiltersFromLocalStorage = ({
	isClosedForComments,
}: {
	isClosedForComments: boolean;
}): FilterOptions => {
	let threads;
	let pageSize;
	let orderBy;

	try {
		// Try to read from local storage
		orderBy = localStorage.getItem('gu.prefs.discussion.order');
		threads = localStorage.getItem('gu.prefs.discussion.threading');
		pageSize = localStorage.getItem('gu.prefs.discussion.pagesize');
	} catch (error) {
		return {
			...DEFAULT_FILTERS,
			orderBy: decideDefaultOrderBy(isClosedForComments),
		};
	}

	function checkPageSize(size: any): PageSizeType {
		// This function handles the fact that some readers have legacy values
		// stored in the browsers
		if (!size) return DEFAULT_FILTERS.pageSize; // Default
		if (size === 'All') return DEFAULT_FILTERS.pageSize; // Convert 'All' to default
		const supportedSizes: PageSizeType[] = [25, 50, 100];
		if (!supportedSizes.includes(size)) return DEFAULT_FILTERS.pageSize; // Convert anything else to default
		return size; // size is acceptable
	}

	function decideDefaultOrderBy(isClosedForComment: boolean): OrderByType {
		return isClosedForComments ? 'oldest' : 'newest';
	}

	// If we found something in LS, use it, otherwise return defaults
	return {
		orderBy: orderBy
			? JSON.parse(orderBy).value
			: decideDefaultOrderBy(isClosedForComments),
		threads: threads ? JSON.parse(threads).value : DEFAULT_FILTERS.threads,
		pageSize: pageSize
			? checkPageSize(JSON.parse(pageSize).value)
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
	onPermalinkClick,
	apiKey,
	onRecommend,
	onComment,
	onReply,
	onPreview,
	onExpand,
}: Props) => {
	const [filters, setFilters] = useState<FilterOptions>(
		initialiseFilters({
			pageSizeOverride,
			orderByOverride,
			permalinkBeingUsed: !!commentToScrollTo,
			isClosedForComments,
		}),
	);
	const [isExpanded, setIsExpanded] = useState<boolean>(
		expanded || window.location.hash === '#comments',
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [page, setPage] = useState<number>(initialPage || 1);
	const [picks, setPicks] = useState<CommentType[]>([]);
	const [
		commentBeingRepliedTo,
		setCommentBeingRepliedTo,
	] = useState<CommentType>();
	const [comments, setComments] = useState<CommentType[]>([]);
	const [numberOfCommentsToShow, setNumberOfCommentsToShow] = useState<number>(
		10,
	);
	const [commentCount, setCommentCount] = useState<number>(0);
	const [mutes, setMutes] = useState<string[]>(readMutes());

	useEffect(() => {
		if (isExpanded) {
			// We want react to complete the current work and render, without trying to batch this update
			// before resetting the number of comments
			// to the total comment amount.
			// This allows a quick render of minimal comments and then immediately begin rendering
			// the remaining comments.
			const timer = setTimeout(() => {
				setNumberOfCommentsToShow(comments.length);
				setLoadingMore(false);
			}, 0);
			return () => clearTimeout(timer);
		}
	}, [isExpanded, comments.length]);

	useEffect(() => {
		// We need this use effect to capture any changes in the expanded prop. This is typicallly
		// seen when clicking permalinks
		setIsExpanded(expanded);
	}, [expanded]);

	useEffect(() => {
		setLoading(true);
		getDiscussion(shortUrl, { ...filters, page }).then((json) => {
			setLoading(false);
			setLoadingMore(true);
			if (json && json.status !== 'error') {
				setComments(json && json.discussion && json.discussion.comments);
				setCommentCount(
					json && json.discussion && json.discussion.topLevelCommentCount,
				);
			}
			setTotalPages(json && json.pages);
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
		setFilters((oldFilters) => {
			return {
				...oldFilters,
				orderBy: orderByOverride ? orderByOverride : oldFilters.orderBy,
				pageSize: pageSizeOverride ? pageSizeOverride : oldFilters.pageSize,
			};
		});
	}, [pageSizeOverride, orderByOverride]);

	// Keep initialPage prop in sync with page
	useEffect(() => {
		if (initialPage) setPage(initialPage);
		// We added commentToScrollTo to the deps here because the initialPage alone wasn't triggered the effect
		// and we want to ensure the discussion rerenders with the right page when the reader clicks Jump To Comment
		// for a comment on a different page
	}, [initialPage, commentToScrollTo]);

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
		let maxPagePossible = Math.floor(commentCount / newFilterObject.pageSize);
		// Add 1 if there is a remainder
		if (commentCount % newFilterObject.pageSize) {
			maxPagePossible = maxPagePossible + 1;
		}
		// Check
		if (page > maxPagePossible) setPage(maxPagePossible);

		rememberFilters(newFilterObject);
		// Filters also show when the view is not expanded but we want to expand when they're changed
		setIsExpanded(true);
		onExpand?.();
		setFilters(newFilterObject);
	};

	const onPageChange = (page: number) => {
		// Pagination also show when the view is not expanded so we want to expand when clicked
		setIsExpanded(true);
		const element = document.getElementById('comment-filters');
		element && element.scrollIntoView();
		setPage(page);
	};

	const toggleMuteStatus = (userId: string) => {
		let updatedMutes;
		if (mutes.includes(userId)) {
			// Already muted, unmute them
			updatedMutes = mutes.filter((id) => id !== userId);
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

		if (!isExpanded) {
			// It's possible to post a comment without the view being expanded
			setIsExpanded(true);
			if (typeof onExpand === 'function') onExpand();
		}

		const commentElement = document.getElementById(`comment-${comment.id}`);
		commentElement && commentElement.scrollIntoView();
	};

	initialiseApi({ additionalHeaders, baseUrl, apiKey });

	const showPagination = totalPages > 1;

	if (!isExpanded && loading) {
		return <span data-testid="loading-comments"></span>;
	}

	if (!isExpanded) {
		return (
			<div css={commentContainerStyles} data-component="discussion">
				{picks && picks.length ? (
					<div css={picksWrapper}>
						{!!picks.length && (
							<TopPicks
								pillar={pillar}
								comments={picks.slice(0, 2)}
								isSignedIn={!!user}
								onPermalinkClick={onPermalinkClick}
								onRecommend={onRecommend}
							/>
						)}
					</div>
				) : (
					<>
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
						{!comments.length ? (
							<NoComments />
						) : (
							<ul css={commentContainerStyles}>
								{comments.slice(0, 2).map((comment) => (
									<li key={comment.id}>
										<CommentContainer
											comment={comment}
											pillar={pillar}
											isClosedForComments={isClosedForComments}
											shortUrl={shortUrl}
											user={user}
											threads={filters.threads}
											commentBeingRepliedTo={commentBeingRepliedTo}
											setCommentBeingRepliedTo={setCommentBeingRepliedTo}
											mutes={mutes}
											toggleMuteStatus={toggleMuteStatus}
											onPermalinkClick={onPermalinkClick}
											onRecommend={onRecommend}
										/>
									</li>
								))}
							</ul>
						)}
					</>
				)}
			</div>
		);
	}

	return (
		<div data-component="discussion" css={commentColumnWrapperStyles}>
			{user && !isClosedForComments && (
				<CommentForm
					pillar={pillar}
					shortUrl={shortUrl}
					onAddComment={onAddComment}
					user={user}
					onComment={onComment}
					onReply={onReply}
					onPreview={onPreview}
				/>
			)}
			{!!picks.length && (
				<TopPicks
					pillar={pillar}
					comments={picks}
					isSignedIn={!!user}
					onPermalinkClick={onPermalinkClick}
					onRecommend={onRecommend}
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
				<NoComments />
			) : (
				<ul css={commentContainerStyles}>
					{comments.slice(0, numberOfCommentsToShow).map((comment) => (
						<li key={comment.id}>
							<CommentContainer
								comment={comment}
								pillar={pillar}
								isClosedForComments={isClosedForComments}
								shortUrl={shortUrl}
								user={user}
								threads={filters.threads}
								commentBeingRepliedTo={commentBeingRepliedTo}
								setCommentBeingRepliedTo={setCommentBeingRepliedTo}
								commentToScrollTo={commentToScrollTo}
								mutes={mutes}
								toggleMuteStatus={toggleMuteStatus}
								onPermalinkClick={onPermalinkClick}
								onRecommend={onRecommend}
								onReply={onReply}
							/>
						</li>
					))}
				</ul>
			)}
			{loadingMore && <LoadingComments />}
			{showPagination && (
				<footer css={footerStyles}>
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
			{user && !isClosedForComments && (
				<CommentForm
					pillar={pillar}
					shortUrl={shortUrl}
					onAddComment={onAddComment}
					user={user}
					onComment={onComment}
					onReply={onReply}
					onPreview={onPreview}
				/>
			)}
		</div>
	);
};
