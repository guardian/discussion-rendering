import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
	render,
	fireEvent,
	waitForElementToBeRemoved,
	screen,
} from '@testing-library/react';

import { Pillar } from '@guardian/types';

import { mockFetchCalls } from './lib/mockFetchCalls';

import { App } from './App';

mockFetchCalls();

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

// Extend the timeout, as we are getting failed test because of timeout
// This is due to an increase in Emotion 11 render speed
// TODO: remove once we have mitigated Emotion 11 render speed
jest.setTimeout(8000);

describe('App', () => {
	it('should expand when view more button is clicked', async () => {
		render(
			<App
				baseUrl=""
				shortUrl="p/39f5z"
				pillar={Pillar.News}
				isClosedForComments={false}
				expanded={false}
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				apiKey="discussion-rendering-test"
				onPermalinkClick={() => {}}
			/>,
		);

		await waitForElementToBeRemoved(() =>
			screen.getByTestId('loading-comments'),
		);

		expect(screen.queryByText('View more comments')).toBeInTheDocument();
		fireEvent.click(screen.getByText('View more comments'));
		expect(screen.queryByText('View more comments')).not.toBeInTheDocument();
		expect(screen.getByText('Display threads')).toBeInTheDocument();
	});

	it('should not render the comment form if user is logged out', async () => {
		render(
			<App
				shortUrl="p/39f5z"
				baseUrl="https://discussion.theguardian.com/discussion-api"
				pillar={Pillar.Culture}
				isClosedForComments={false}
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				expanded={false}
				onPermalinkClick={() => {}}
				apiKey=""
			/>,
		);

		await waitForElementToBeRemoved(() =>
			screen.getByTestId('loading-comments'),
		);

		expect(screen.getByText('View more comments')).toBeInTheDocument();
		expect(screen.queryAllByText('jamesgorrie').length).toBeGreaterThan(0);
		expect(screen.queryByPlaceholderText('Join the discussion')).toBeNull();
	});

	it('should render two comment forms when user is logged in', async () => {
		render(
			<App
				baseUrl=""
				shortUrl="p/39f5z"
				pillar={Pillar.News}
				isClosedForComments={false}
				user={aUser}
				expanded={true}
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				apiKey="discussion-rendering-test"
				onPermalinkClick={() => {}}
			/>,
		);

		await waitForElementToBeRemoved(() =>
			screen.getByTestId('loading-comments'),
		);

		expect(screen.queryAllByPlaceholderText('Join the discussion').length).toBe(
			2,
		);
	});

	it('should not render the view more button if there are zero comments', async () => {
		render(
			<App
				baseUrl=""
				shortUrl="p/39f5x" // A discussion with no comments
				pillar={Pillar.News}
				isClosedForComments={false}
				expanded={false}
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				apiKey="discussion-rendering-test"
				onPermalinkClick={() => {}}
			/>,
		);

		await waitForElementToBeRemoved(() =>
			screen.getByTestId('loading-comments'),
		);

		expect(screen.getByText('Display threads')).toBeInTheDocument();
		expect(screen.queryByText('View more comments')).not.toBeInTheDocument();
	});

	it('should not render the view more button if there are only two comments', async () => {
		render(
			<App
				baseUrl=""
				shortUrl="p/39f5a" // A discussion with only two comments
				pillar={Pillar.News}
				isClosedForComments={false}
				expanded={false}
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				apiKey="discussion-rendering-test"
				onPermalinkClick={() => {}}
			/>,
		);

		await waitForElementToBeRemoved(() =>
			screen.getByTestId('loading-comments'),
		);

		expect(screen.getByText('Display threads')).toBeInTheDocument();
		expect(screen.queryByText('View more comments')).not.toBeInTheDocument();
	});
});
