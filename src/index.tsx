import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { pillarToEnum } from './lib/pillarToEnum';
import { CAPIPillar } from './types';

import { App } from './App';

const IndexPageWrapper = () => {
	const [options, setOptions] = useState({
		shortUrl: '',
		closedForComments: false,
		pillar: 'news' as CAPIPillar,
	});

	const getQueryParam = (queryParam: string, defaultValue: string): string =>
		new URLSearchParams(window.location.search).get(queryParam) || defaultValue;

	useEffect(() => {
		setOptions({
			shortUrl: getQueryParam('id', '39f5z'),
			closedForComments: !!getQueryParam('closedForComments', 'false'),
			pillar: getQueryParam('pillar', 'news') as CAPIPillar,
		});
	}, [options.closedForComments]);

	// Only render when we have checked the query params
	if (options.shortUrl === '') {
		return null;
	}

	return (
		<>
			<h1>Example Discussion</h1>
			<p>
				Set a specific discussion using the id in a query param like{' '}
				<a href="?id=32255&closedForComments=true&pillar=opinion">
					?id=32255&closedForComments=true&pillar=opinion
				</a>
				.
			</p>
			<style>{`body { padding: 0 10px;}`}</style>
			<App
				baseUrl="https://discussion.theguardian.com/discussion-api"
				pillar={pillarToEnum(options.pillar)}
				isClosedForComments={options.closedForComments}
				shortUrl={`/p/${options.shortUrl}`}
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				expanded={false}
				onPermalinkClick={() => {}}
				apiKey="discussion-rendering"
			/>
		</>
	);
};

ReactDOM.render(<IndexPageWrapper />, document.getElementById('root'));
