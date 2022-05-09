import React from 'react';
import { css } from '@emotion/react';

import { resets } from '@guardian/source-foundations';
import { Preview } from './Preview';

export default { component: Preview, title: 'Preview' };

export const PreviewStory = () => (
	<div
		css={css`
			padding: 20px;
			width: 700px;
		`}
	>
		<style>{resets.resetCSS}</style>
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
		<style>{resets.resetCSS}</style>
		<Preview previewHtml="<p>Hello world!<br>this is a line break </p> <p>this is two</p> <p><br>this is three</p>" />
	</div>
);
PreviewStoryLinebreaks.story = { name: 'Preview comment with linebreaks' };
