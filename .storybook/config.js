import { configure, addParameters } from "@storybook/react";
import fetchMock from "fetch-mock";

import { discussion } from "../fixtures/discussion";
import { comment } from "../fixtures/comment";

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
  // Get discussion
  .get(/.*discussion.theguardian.com\/discussion-api\/discussion\/.*/, {
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
  .get(/.*profile\.theguardian\.com\/signin\?INTCMP=DOTCOM_NEWHEADER_SIGNIN/, {
    status: 200
  })
  .post(/.*profile\.theguardian\.com\/actions\/signInSecondStepCurrent/, {
    status: 200
  })

  // Post comment
  .post(/.*discussion.theguardian.com\/discussion-api\/discussion\/.*/, {
    status: 200,
    body: {
      status: "ok",
      message: "123456"
    }
  });

const guardianViewports = {
  mobileMedium: {
    name: "mobileMedium",
    styles: {
      width: "375px",
      height: "800px"
    }
  },
  mobileLandscape: {
    name: "mobileLandscape",
    styles: {
      width: "480px",
      height: "800px"
    }
  },
  phablet: {
    name: "phablet",
    styles: {
      width: "660px",
      height: "800px"
    }
  },
  tablet: {
    name: "tablet",
    styles: {
      width: "740px",
      height: "800px"
    }
  },
  desktop: {
    name: "desktop",
    styles: {
      width: "980px",
      height: "800px"
    }
  },
  leftCol: {
    name: "leftCol",
    styles: {
      width: "1140px",
      height: "800px"
    }
  },
  wide: {
    name: "wide",
    styles: {
      width: "1300px",
      height: "800px"
    }
  }
};

addParameters({
  viewport: {
    viewports: guardianViewports,
    defaultViewport: "wide"
  }
});

// automatically import all files ending in *.stories.tsx
configure(require.context("../", true, /\.stories\.tsx?$/), module);
