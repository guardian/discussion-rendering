import React from 'react';

import { Preview } from './Preview';

export default { component: Preview, title: 'Preview' };

export const PreviewStory = () => (
	<Preview previewHtml="<p>This is some preview text</p>" />
);
PreviewStory.story = { name: 'default' };
