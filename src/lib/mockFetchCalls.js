import fetchMock from "fetch-mock";

import { discussion } from "../../fixtures/discussion";
import { comment } from "../../fixtures/comment";

export const mockedMessageID = "123456";

export const mockFetchCalls = () => {
  fetchMock
    .restore()
    // Comment count
    .get(/.*api.nextgen.guardianapps.co.uk\/discussion\/comment-counts.*/, {
      status: 200,
      body: {
        counts: [
          {
            id: "/p/ddp96",
            count: 432
          }
        ]
      }
    })
    .get(/\/discussion\/comments\/count.*/, {
      status: 200,
      body: {
        counts: [
          {
            id: "/p/ddp96",
            count: 432
          }
        ]
      }
    })
    // Get discussion
    .get(/.*discussion.theguardian.com\/discussion-api\/discussion\/.*/, {
      status: 200,
      body: discussion
    })
    .get(
      /.*\/discussion\?orderBy=newest&pageSize=25&displayThreaded=true&maxResponses=3&page=1/,
      {
        status: 200,
        body: discussion
      }
    )
    .get(/.*\/discussion\/topcomments/, {
      status: 200,
      body: discussion
    })

    // Get more replies
    .get(/.*discussion.theguardian.com\/discussion-api\/comment\/.*/, {
      status: 200,
      body: {
        status: "ok",
        comment
      }
    })

    // Recommend
    .post(
      /.*discussion.theguardian.com\/discussion-api\/comment\/.*\/recommend/,
      {
        status: 200,
        body: {
          status: "ok"
        }
      }
    )

    // Abuse form
    .post(
      /.*discussion.theguardian.com\/discussion-api\/comment\/.*\/reportAbuse/,
      {
        status: 200,
        body: {
          status: "ok"
        }
      }
    )

    // Login redirect
    .get(
      /.*profile\.theguardian\.com\/signin\?INTCMP=DOTCOM_NEWHEADER_SIGNIN/,
      {
        status: 200
      }
    )
    .post(/.*profile\.theguardian\.com\/actions\/signInSecondStepCurrent/, {
      status: 200
    })

    // Post comment
    .post(/.*discussion.theguardian.com\/discussion-api\/discussion\/.*/, {
      status: 200,
      body: {
        status: "ok",
        message: mockedMessageID
      }
    });
};
