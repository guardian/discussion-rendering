import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';

ReactDOM.render(
    <App
        baseUrl="https://discussion.theguardian.com/discussion-api"
        pillar="news"
        isClosedForComments={false}
        shortUrl="/p/39f5z"
        additionalHeaders={{
            'D2-X-UID': 'testD2Header',
            'GU-Client': 'testClientHeader',
        }}
        expanded={false}
        onPermalinkClick={() => {}}
        apiKey="discussion-rendering"
    />,
    document.getElementById('root'),
);
