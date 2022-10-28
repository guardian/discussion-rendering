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
		<Preview previewHtml="<p>Hello world!<br>this is a line break </p> <p>this is two</p> <p><br>this is three</p>" />
	</div>
);
PreviewStoryLinebreaks.story = { name: 'Preview comment with linebreaks' };
