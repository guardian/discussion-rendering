import React from 'react';
import { css } from '@emotion/react';

import { Preview } from './Preview';

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
		<Preview previewHtml="<p>This is some preview text<br>with a line break in the middle of a paragraph</p><p>This is a new paragraph.</p>" />
	</div>
);
PreviewStoryLinebreaks.story = { name: 'Preview comment with linebreaks' };
