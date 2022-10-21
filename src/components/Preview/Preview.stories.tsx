import { css } from '@emotion/react';
import React from 'react';
import { Preview } from './Preview';

// eslint-disable-next-line import/no-default-export -- it’s a story
export default { component: Preview, title: 'Preview' };

export const PreviewStory = () => (
	<div
		css={css`
			padding: 20px;
			width: 700px;
		`}
	>
		<Preview previewHtml="<p>This is some preview text</p>" />
	</div>
);
PreviewStory.story = { name: 'default' };

export const PreviewStoryLinebreaks = () => (
	<div
		css={css`
			padding: 20px;
			width: 700px;
		`}
	>
		<Preview previewHtml="<p>Hello world!<br>this is a line break </p> <p>this is two</p> <p><br>this is three</p>" />
	</div>
);
PreviewStoryLinebreaks.story = { name: 'Preview comment with linebreaks' };
