import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
	render,
	waitForElementToBeRemoved,
	screen,
} from '@testing-library/react';

import { ArticlePillar } from '@guardian/libs';

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
jest.setTimeout(20000);

describe('App', () => {
	it('should not render the comment form if user is logged out', async () => {
		render(
			<App
				shortUrl="p/39f5z"
				baseUrl="https://discussion.theguardian.com/discussion-api"
				pillar={ArticlePillar.Culture}
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

		expect(screen.queryAllByText('jamesgorrie').length).toBeGreaterThan(0);
		expect(screen.queryByPlaceholderText('Join the discussion')).toBeNull();
	});

	it('should render two comment forms when user is logged in', async () => {
		render(
			<App
				baseUrl=""
				shortUrl="p/39f5z"
				pillar={ArticlePillar.News}
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

		expect(screen.queryAllByPlaceholderText('Join the discussion').length).toBe(
			2,
		);
	});
});
