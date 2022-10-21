import type { DiscussionResponse } from '../types';

export const discussionWithTwoComments: DiscussionResponse = {
	status: 'ok',
	page: 1,
	pages: 0,
	pageSize: 100,
	orderBy: 'oldest',
	discussion: {
		key: '/p/39f5x',
		webUrl: 'https://www.theguardian.com/science/grrlscientist/2012/aug/07/3',
		apiUrl:
			'https://discussion.guardianapis.com/discussion-api/discussion//p/39f5x',
		commentCount: 0,
		topLevelCommentCount: 0,
		isClosedForComments: false,
		isClosedForRecommendation: false,
		isThreaded: true,
		title:
			'Mystery bird: black-and-red broadbill, Cymbirhynchus macrorhynchos story',
		comments: [
			{
				id: 37772513,
				body:
					'<p>Lovely chickens! <a href="http://www.mydomain.com">https://www.supersupersuperlongdomainnameImeanitneverstopsatallevereveritmakesyouwonderiftheremightbealimittothesethings.com</a></p>',
				date: '04 July 2014 1:57pm',
				isoDateTime: '2014-07-04T12:57:48Z',
				status: 'visible',
				webUrl: 'https://discussion.theguardian.com/comment-permalink/37772513',
				apiUrl:
					'https://discussion.guardianapis.com/discussion-api/comment/37772513',
				numRecommends: 1,
				isHighlighted: false,
				userProfile: {
					userId: '2310959',
					displayName: 'jamesgorrie',
					webUrl: 'https://profile.theguardian.com/user/id/2310959',
					apiUrl:
						'https://discussion.guardianapis.com/discussion-api/profile/2310959',
					avatar: 'https://avatar.guim.co.uk/user/2310959',
					secureAvatarUrl: 'https://avatar.guim.co.uk/user/2310959',
					badge: [
						{
							name: 'Staff',
						},
					],
				},
			},
			{
				id: 42979860,
				body: '<p>test</p>',
				date: '30 October 2014 5:24pm',
				isoDateTime: '2014-10-30T17:24:16Z',
				status: 'visible',
				webUrl: 'https://discussion.theguardian.com/comment-permalink/42979860',
				apiUrl:
					'https://discussion.guardianapis.com/discussion-api/comment/42979860',
				numRecommends: 0,
				isHighlighted: false,
				userProfile: {
					userId: '1186733',
					displayName: 'GideonGoldberg',
					webUrl: 'https://profile.theguardian.com/user/id/1186733',
					apiUrl:
						'https://discussion.guardianapis.com/discussion-api/profile/1186733',
					avatar: 'https://avatar.guim.co.uk/user/1186733',
					secureAvatarUrl: 'https://avatar.guim.co.uk/user/1186733',
					badge: [],
				},
			},
		],
	},
};
