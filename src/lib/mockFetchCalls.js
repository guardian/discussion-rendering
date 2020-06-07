import fetchMock from 'fetch-mock';

import { discussion } from '../fixtures/discussion';
import { comment } from '../fixtures/comment';
import { topPicks } from '../fixtures/topPicks';
import { noTopPicks } from '../fixtures/noTopPicks';
import { discussionWithNoComments } from '../fixtures/discussionWithNoComments';

export const mockedMessageID = '123456';

export const mockFetchCalls = () => {
    fetchMock
        .restore()
        // Comment count
        .get(/.*api.nextgen.guardianapps.co.uk\/discussion\/comment-counts.*/, {
            status: 200,
            body: {
                counts: [
                    {
                        id: '/p/ddp96',
                        count: 432,
                    },
                ],
            },
        })
        .get(/\/discussion\/comments\/count.*/, {
            status: 200,
            body: {
                counts: [
                    {
                        id: '/p/ddp96',
                        count: 432,
                    },
                ],
            },
        })
        // Get discussion 39f5z
        .get(
            /.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/39f5z\?.*/,
            {
                status: 200,
                body: discussion,
            },
        )
        .get(/.*\/discussion\/p\/39f5z\/topcomments.*/, {
            status: 200,
            body: topPicks,
        })

        // Get discussion 39f5x
        .get(
            /.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/39f5x\?.*/,
            {
                status: 200,
                body: discussionWithNoComments,
            },
        )
        .get(/.*\/discussion\/p\/39f5x\/topcomments.*/, {
            status: 200,
            body: noTopPicks,
        })

        // Get discussion abc123
        .get(
            /.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/abc123\?.*/,
            {
                status: 200,
                body: discussion,
            },
        )
        .get(/.*\/discussion\/p\/abc123\/topcomments.*/, {
            status: 200,
            body: noTopPicks,
        })

        // Get more replies
        .get(/.*discussion.theguardian.com\/discussion-api\/comment\/.*/, {
            status: 200,
            body: {
                status: 'ok',
                comment,
            },
        })

        // Recommend
        .post(
            /.*discussion.theguardian.com\/discussion-api\/comment\/.*\/recommend/,
            {
                status: 200,
                body: {
                    status: 'ok',
                },
            },
        )

        // Abuse form
        .post(
            /.*discussion.theguardian.com\/discussion-api\/comment\/.*\/reportAbuse/,
            {
                status: 200,
                body: {
                    status: 'ok',
                },
            },
        )

        // Login redirect
        .get(
            /.*profile\.theguardian\.com\/signin\?INTCMP=DOTCOM_NEWHEADER_SIGNIN/,
            {
                status: 200,
            },
        )
        .post(/.*profile\.theguardian\.com\/actions\/signInSecondStepCurrent/, {
            status: 200,
        })

        // Post comment
        .post(/.*discussion.theguardian.com\/discussion-api\/discussion\/.*/, {
            status: 200,
            body: {
                status: 'ok',
                message: mockedMessageID,
            },
        });

    return fetchMock;
};
