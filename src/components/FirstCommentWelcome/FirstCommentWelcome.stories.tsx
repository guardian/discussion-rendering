import { ArticlePillar } from '@guardian/libs';

import { FirstCommentWelcome } from './FirstCommentWelcome';

export default { title: 'FirstCommentWelcome' };

export const defaultStory = () => (
	<FirstCommentWelcome
		body="My first message ever!!"
		pillar={ArticlePillar.Lifestyle}
		submitForm={() => {}}
		cancelSubmit={() => {}}
	/>
);
defaultStory.story = { name: 'Welcome message' };

export const CommentWithError = () => (
	<FirstCommentWelcome
		body="My first message ever!!"
		pillar={ArticlePillar.News}
		error="This is a custom user name error message"
		submitForm={() => {}}
		cancelSubmit={() => {}}
	/>
);
CommentWithError.story = {
	name: 'Welcome message with error',
};
