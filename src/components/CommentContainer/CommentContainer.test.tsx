import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { ArticlePillar } from '@guardian/libs';
import {
	render,
	fireEvent,
	// @ts-expect-error : https://github.com/testing-library/react-testing-library/issues/610
	waitFor,
} from '@testing-library/react';
import { comment } from '../../fixtures/comment';
import { mockedMessageID, mockFetchCalls } from '../../lib/mockFetchCalls';
import type { CommentType } from '../../types';
import { CommentContainer } from './CommentContainer';

mockFetchCalls();

// @ts-expect-error
const firstCommentResponse: CommentType = comment.responses[0];

const commentWithReply: CommentType = {
	...comment,
	responses: [firstCommentResponse],
};

const commentWithoutReply: CommentType = {
	...comment,
	responses: [],
};

const aUser = {
	userId: 'abc123',
	displayName: 'Jane Smith',
	webUrl: '',
	apiUrl: '',
	avatar: '',
	secureAvatarUrl: '',
	badge: [],
	privateFields: {
		canPostComment: true,
		isPremoderated: false,
		hasCommented: true,
	},
};

describe('CommentContainer', () => {
	it('Post a comment to a root comment', async () => {
		const newCommentText = 'A brand new comment';

		// a workaround to emulating hooks outside of render
		let commentBeingRepliedTo: CommentType | undefined = commentWithoutReply;
		const mockSetCommentBeingRepliedTo = jest.fn(
			(newCommentBeingRepliedTo?: CommentType) => {
				commentBeingRepliedTo = newCommentBeingRepliedTo;
			},
		);

		// https://stackoverflow.com/a/52335414
		Element.prototype.scrollIntoView = () => {};

		const { getByTestId, queryByText, getByText, rerender } = render(
			<CommentContainer
				shortUrl=""
				comment={commentWithoutReply} //TODO: should be comments with reponses
				pillar={ArticlePillar.News}
				user={aUser}
				threads="collapsed"
				commentBeingRepliedTo={commentBeingRepliedTo}
				setCommentBeingRepliedTo={mockSetCommentBeingRepliedTo}
				isClosedForComments={false}
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
			/>,
		);

		// expect Comment Form to be present
		expect(getByText('Post your comment')).toBeInTheDocument();

		// add comment to textarea
		fireEvent.change(getByTestId('comment-input'), {
			target: { value: newCommentText },
		});

		// Submit form
		fireEvent.click(getByText('Post your comment'));

		// make sure mock function has been called
		await waitFor(() =>
			expect(mockSetCommentBeingRepliedTo).toHaveBeenCalledTimes(1),
		);

		// make sure the new comment appeats
		await waitFor(() => {
			expect(getByTestId(mockedMessageID)).toBeInTheDocument();
		});

		// rerender with updated commentBeingRepliedTo
		rerender(
			<CommentContainer
				shortUrl=""
				comment={commentWithoutReply} //TODO: should be comments with reponses
				pillar={ArticlePillar.News}
				user={aUser}
				threads="collapsed"
				commentBeingRepliedTo={commentBeingRepliedTo}
				setCommentBeingRepliedTo={mockSetCommentBeingRepliedTo}
				isClosedForComments={false}
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
			/>,
		);

		// make sure the comment form submit button does not appear anymore
		// note: we need to use queryByText or else we get an error
		const commentFormSubmitButton = queryByText('Post your comment');
		expect(commentFormSubmitButton).toBeNull();
	});

	it('Post a comment to a reply comment', async () => {
		const newCommentText = 'A brand new comment';

		// a workaround to emulating hooks outside of render
		let commentBeingRepliedTo: CommentType | undefined = firstCommentResponse;
		const mockSetCommentBeingRepliedTo = jest.fn(
			(newCommentBeingRepliedTo?: CommentType) => {
				commentBeingRepliedTo = newCommentBeingRepliedTo;
			},
		);

		// https://stackoverflow.com/a/52335414
		Element.prototype.scrollIntoView = () => {};

		const { getByTestId, queryByText, getByText, rerender } = render(
			<CommentContainer
				shortUrl=""
				comment={commentWithReply} //TODO: should be comments with reponses
				pillar={ArticlePillar.News}
				user={aUser}
				threads="collapsed"
				commentBeingRepliedTo={commentBeingRepliedTo}
				setCommentBeingRepliedTo={mockSetCommentBeingRepliedTo}
				isClosedForComments={false}
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
			/>,
		);

		// expect Comment Form to be present
		expect(getByText('Post your comment')).toBeInTheDocument();

		// add comment to textarea
		fireEvent.change(getByTestId('comment-input'), {
			target: { value: newCommentText },
		});

		// Submit form
		fireEvent.click(getByText('Post your comment'));

		// make sure mock function has been called
		await waitFor(() =>
			expect(mockSetCommentBeingRepliedTo).toHaveBeenCalledTimes(1),
		);

		// make sure the new comment appeats
		await waitFor(() => {
			expect(getByTestId(mockedMessageID)).toBeInTheDocument();
		});

		// rerender with updated commentBeingRepliedTo
		rerender(
			<CommentContainer
				shortUrl=""
				comment={commentWithoutReply} //TODO: should be comments with reponses
				pillar={ArticlePillar.News}
				user={aUser}
				threads="collapsed"
				commentBeingRepliedTo={commentBeingRepliedTo}
				setCommentBeingRepliedTo={mockSetCommentBeingRepliedTo}
				isClosedForComments={false}
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
			/>,
		);

		// make sure the comment form submit button does not appear anymore
		// note: we need to use queryByText or else we get an error
		const commentFormSubmitButton = queryByText('Post your comment');
		expect(commentFormSubmitButton).toBeNull();
	});
});
