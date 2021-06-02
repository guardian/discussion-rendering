import { DiscussionResponse } from '../types';

export const legacyDiscussionWithoutFullWidthComment: DiscussionResponse = {
    status: 'ok',
	page: 1,
	pages: 0,
	pageSize: 100,
	orderBy: 'oldest',
	discussion: {
        apiUrl: "https://discussion.guardianapis.com/discussion-api/discussion//p/4v8kk",
        commentCount: 7,
        comments: [
            {
                apiUrl: "https://discussion.guardianapis.com/discussion-api/comment/38591122",
                body: "<p>someone's run out of ideas..!</p>",
                date: "25 July 2014 9:07am",
                id: 38591122,
                isHighlighted: false,
                isoDateTime: "2014-07-25T08:07:54Z",
                numRecommends: 0,
                status: "visible",
                userProfile: {
                    apiUrl: "https://discussion.guardianapis.com/discussion-api/profile/12173512",
                    avatar: "https://avatar.guim.co.uk/user/12173512",
                    badge: [],
                    displayName: "bellyofcassano",
                    secureAvatarUrl: "https://avatar.guim.co.uk/user/12173512",
                    userId: "12173512",
                    webUrl: "https://profile.theguardian.com/user/id/12173512"
                },
                webUrl: "https://discussion.theguardian.com/comment-permalink/38591122"
            },
            {
                apiUrl: "https://discussion.guardianapis.com/discussion-api/comment/38649787",
                body: "<p>Edge of seventeen.</p>",
                date: "26 July 2014 6:37pm",
                id: 38649787,
                isHighlighted: false,
                isoDateTime: "2014-07-26T17:37:07Z",
                numRecommends: 0,
                status: "visible",
                userProfile: {
                    apiUrl: "https://discussion.guardianapis.com/discussion-api/profile/4431346",
                    avatar: "https://avatar.guim.co.uk/user/4431346",
                    badge: [],
                    displayName: "halfienoakes",
                    secureAvatarUrl: "https://avatar.guim.co.uk/user/4431346",
                    userId: "4431346",
                    webUrl: "https://profile.theguardian.com/user/id/4431346"
                },
                webUrl: "https://discussion.theguardian.com/comment-permalink/38649787"
            }
        ],
        isClosedForComments: true,
        isClosedForRecommendation: true,
        isThreaded: true,
        key: "/p/4v8kk",
        title: "Stevie Nicks to release double album of songs from her past",
        topLevelCommentCount: 6,
        webUrl: "https://www.theguardian.com/music/2014/jul/25/stevie-nicks-ro-release-double-album-of-songs-from-her-past"
    }
}

