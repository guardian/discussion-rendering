import React from 'react';
import { App } from './App';
import { css } from 'emotion';

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
            pillar="culture"
            isClosedForComments={false}
            additionalHeaders={{
                'D2-X-UID': 'testD2Header',
                'GU-Client': 'testClientHeader',
            }}
            expanded={false}
            onPermalinkClick={() => {}}
            apiKey=""
            onHeightChange={() => {}}
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
            pillar="lifestyle"
            isClosedForComments={false}
            additionalHeaders={{
                'D2-X-UID': 'testD2Header',
                'GU-Client': 'testClientHeader',
            }}
            expanded={true}
            onPermalinkClick={() => {}}
            apiKey=""
            onHeightChange={() => {}}
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
            pillar="opinion"
            isClosedForComments={false}
            additionalHeaders={{
                'D2-X-UID': 'testD2Header',
                'GU-Client': 'testClientHeader',
            }}
            expanded={true}
            onPermalinkClick={() => {}}
            apiKey=""
            onHeightChange={() => {}}
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
            pillar="news"
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
            onHeightChange={() => {}}
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
            pillar="sport"
            isClosedForComments={false}
            baseUrl="https://discussion.theguardian.com/discussion-api"
            additionalHeaders={{
                'D2-X-UID': 'testD2Header',
                'GU-Client': 'testClientHeader',
            }}
            expanded={false}
            onPermalinkClick={() => {}}
            apiKey=""
            onHeightChange={() => {}}
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
            pillar="lifestyle"
            isClosedForComments={true}
            user={aUser}
            additionalHeaders={{
                'D2-X-UID': 'testD2Header',
                'GU-Client': 'testClientHeader',
            }}
            expanded={true}
            onPermalinkClick={() => {}}
            apiKey=""
            onHeightChange={() => {}}
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
            pillar="culture"
            isClosedForComments={false}
            additionalHeaders={{
                'D2-X-UID': 'testD2Header',
                'GU-Client': 'testClientHeader',
            }}
            expanded={false}
            onPermalinkClick={() => {}}
            apiKey=""
            onHeightChange={() => {}}
        />
    </div>
);
NoComments.story = {
    name: 'when no comments have been made',
};
