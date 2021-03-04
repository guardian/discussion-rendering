import React from 'react';
import { App } from './App';
import { css } from 'emotion';

import { Pillar } from '@guardian/types';

import { UserProfile } from './types';

export default { component: App, title: 'App' };

const aUser: UserProfile = {
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

export const LoggedOutHiddenPicks = () => (
	<div
		className={css`
			width: 100%;
			max-width: 620px;
		`}
	>
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
			onExpanded={(expandedTime) => {
				console.log(expandedTime);
			}}
		/>
	</div>
);
LoggedOutHiddenPicks.story = {
	name: 'when logged out, unexpanded and with picks',
};

export const InitialPage = () => (
	<div
		className={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5z"
			initialPage={3}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={Pillar.Lifestyle}
			isClosedForComments={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={true}
			onPermalinkClick={() => {}}
			apiKey=""
		/>
	</div>
);
InitialPage.story = { name: 'with initial page set to 3' };

export const Overrides = () => (
	<div
		className={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5z"
			initialPage={3}
			pageSizeOverride={50}
			orderByOverride="recommendations"
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={Pillar.Opinion}
			isClosedForComments={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={true}
			onPermalinkClick={() => {}}
			apiKey=""
		/>
	</div>
);
Overrides.story = { name: 'with page size overridden to 50' };

export const LoggedInHiddenNoPicks = () => (
	<div
		className={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/abc123"
			pillar={Pillar.News}
			isClosedForComments={false}
			user={aUser}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
		/>
	</div>
);
LoggedInHiddenNoPicks.story = {
	name: 'when logged in, with no picks and not expanded',
};

export const LoggedOutHiddenNoPicks = () => (
	<div
		className={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/abc123"
			pillar={Pillar.Sport}
			isClosedForComments={false}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
		/>
	</div>
);
LoggedOutHiddenNoPicks.story = {
	name: 'when logged out, with no picks and not expanded',
};

export const Closed = () => (
	<div
		className={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5z"
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={Pillar.Lifestyle}
			isClosedForComments={true}
			user={aUser}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={true}
			onPermalinkClick={() => {}}
			apiKey=""
		/>
	</div>
);
Closed.story = { name: 'Logged in but closed for comments' };

export const NoComments = () => (
	<div
		className={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5x" // A discussion with zero comments
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
		/>
	</div>
);
NoComments.story = {
	name: 'when no comments have been made',
};

export const LegacyDiscussion = () => (
	<div
		className={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/32255" // A 'legacy' discussion that doesn't allow threading
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
		/>
	</div>
);
LegacyDiscussion.story = {
	name: "a legacy discussion that doesn't allow threading",
};
