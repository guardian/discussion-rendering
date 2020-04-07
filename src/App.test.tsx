import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

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

describe('App', () => {
    it('should expand when view more button is clicked', () => {
        const { getByText, queryByText } = render(
            <App
                baseUrl=""
                shortUrl=""
                pillar="news"
                isClosedForComments={false}
                expanded={false}
                additionalHeaders={{
                    'D2-X-UID': 'testD2Header',
                    'GU-Client': 'testClientHeader',
                }}
            />,
        );

        expect(queryByText('View more comments')).toBeInTheDocument();
        fireEvent.click(getByText('View more comments'));
        expect(queryByText('View more comments')).not.toBeInTheDocument();
        expect(getByText('Display threads')).toBeInTheDocument();
    });

    it('should not render the comment form if user not logged in', () => {
        const { queryByText, queryByPlaceholderText } = render(
            <App
                baseUrl=""
                shortUrl=""
                pillar="news"
                isClosedForComments={false}
                // user={undefined}
                expanded={false}
                additionalHeaders={{
                    'D2-X-UID': 'testD2Header',
                    'GU-Client': 'testClientHeader',
                }}
            />,
        );

        expect(queryByText('View more comments')).toBeInTheDocument();
        expect(queryByPlaceholderText('Join the discussion')).toBeNull();
    });

    it('should render the comment form when user is logged in', () => {
        const { getByPlaceholderText } = render(
            <App
                baseUrl=""
                shortUrl=""
                pillar="news"
                isClosedForComments={false}
                user={aUser}
                expanded={true}
                additionalHeaders={{
                    'D2-X-UID': 'testD2Header',
                    'GU-Client': 'testClientHeader',
                }}
            />,
        );
        expect(getByPlaceholderText('Join the discussion')).toBeInTheDocument();
    });
});
