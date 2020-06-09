import React from 'react';

import { Comment } from './Comment';
import { CommentType, UserProfile } from '../../types';

export default { title: 'Comment' };

const commentData: CommentType = {
    id: 25487686,
    body:
        "<p>Beau Jos pizza in Idaho Springs is a great place for mountain pizza pies. Order one with extra thick crust and drizzle it with honey. Y'all can try the Challenge if you fancy, and sketch on your napkins so your art can join their walls. This was 15 years ago, but I hope it's still there! As for music, anything from Boulder's own Big Head Todd &amp; the Monsters - 'Broken Hearted Savior' is a good start, with 'Bittersweet' a good road track. I'm jealous!!!</p>",
    date: '26 July 2013 4:13pm',
    isoDateTime: '2013-07-26T15:13:20Z',
    status: 'visible',
    webUrl: 'https://discussion.theguardian.com/comment-permalink/25487686',
    apiUrl:
        'https://discussion.guardianapis.com/discussion-api/comment/25487686',
    numRecommends: 0,
    isHighlighted: false,
    userProfile: {
        userId: '2762428',
        displayName: 'FrankDeFord',
        webUrl: 'https://profile.theguardian.com/user/id/2762428',
        apiUrl:
            'https://discussion.guardianapis.com/discussion-api/profile/2762428',
        avatar: 'https://avatar.guim.co.uk/user/2762428',
        secureAvatarUrl: 'https://avatar.guim.co.uk/user/2762428',
        badge: [],
    },
    responses: [],
    metaData: {
        commentCount: 2,
        staffCommenterCount: 1,
        editorsPickCount: 0,
        blockedCount: 0,
        responseCount: 1,
    },
};

const commentStaffData: CommentType = {
    ...commentData,
    userProfile: {
        ...commentData.userProfile,
        badge: [
            {
                name: 'Staff',
            },
        ],
    },
};

const blockedCommentData = {
    ...commentData,
    status: 'blocked',
    body:
        "This comment was removed by a moderator because it didn't abide by our <a href='http://www.theguardian.com/community-standards'>community standards</a>. Replies may also be deleted. For more detail see <a href='http://www.guardian.co.uk/community-faqs'>our FAQs</a>.",
};

const replyCommentData: CommentType = {
    ...commentData,
    responseTo: {
        displayName: 'ArtVandelay',
        commentApiUrl: '',
        isoDateTime: '',
        date: '',
        commentId: '123456',
        commentWebUrl: '',
    },
};

const staffUser: UserProfile = {
    userId: 'abc123',
    displayName: 'Jane Smith',
    webUrl: '',
    apiUrl: '',
    avatar: '',
    secureAvatarUrl: '',
    badge: [{ name: 'Staff' }],
    privateFields: {
        canPostComment: true,
        isPremoderated: false,
        hasCommented: true,
    },
};

export const Root = () => (
    <Comment
        comment={commentData}
        pillar={'news'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
Root.story = {
    name: 'A root comment on desktop view',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [1300] },
    },
};

export const RootMobile = () => (
    <Comment
        comment={commentData}
        pillar={'sport'}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isClosedForComments={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
RootMobile.story = {
    name: 'A root comment on mobile view',
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
        chromatic: { viewports: [375] },
    },
};

export const ReplyComment = () => (
    <Comment
        comment={replyCommentData}
        pillar={'lifestyle'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        isReply={true}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
ReplyComment.story = {
    name: 'A reply on desktop view',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [1300] },
    },
};

export const MobileReply = () => (
    <Comment
        comment={replyCommentData}
        pillar={'culture'}
        setCommentBeingRepliedTo={() => {}}
        isReply={true}
        isClosedForComments={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
MobileReply.story = {
    name: 'A reply on mobile view',
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
        chromatic: { viewports: [375] },
    },
};

export const PickedComment = () => (
    <Comment
        comment={{
            ...commentData,
            isHighlighted: true,
        }}
        pillar={'labs'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
PickedComment.story = { name: 'Picked Comment' };

export const StaffUserComment = () => (
    <Comment
        comment={commentStaffData}
        pillar={'opinion'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
StaffUserComment.story = { name: 'Staff User Comment' };

export const PickedStaffUserComment = () => (
    <Comment
        comment={{
            ...commentStaffData,
            isHighlighted: true,
        }}
        pillar={'news'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
PickedStaffUserComment.story = {
    name: 'with staff and picked badges on desktop',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [1300] },
    },
};

export const PickedStaffUserCommentMobile = () => (
    <Comment
        comment={{
            ...commentStaffData,
            isHighlighted: true,
        }}
        pillar={'sport'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
PickedStaffUserCommentMobile.story = {
    name: 'with staff and picked badges on mobile',
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
        chromatic: { viewports: [375] },
    },
};

export const LoggedInAsModerator = () => (
    <Comment
        comment={commentData}
        pillar={'lifestyle'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        user={staffUser}
        isReply={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
LoggedInAsModerator.story = { name: 'Logged in as moderator' };

export const BlockedComment = () => (
    <Comment
        comment={blockedCommentData}
        pillar={'culture'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
BlockedComment.story = { name: 'Blocked comment' };

export const MutedComment = () => (
    <Comment
        comment={blockedCommentData}
        pillar={'sport'}
        isClosedForComments={false}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isMuted={true}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
MutedComment.story = { name: 'Muted comment' };

export const ClosedForComments = () => (
    <Comment
        comment={commentData}
        pillar={'news'}
        isClosedForComments={true}
        setCommentBeingRepliedTo={() => {}}
        isReply={false}
        isMuted={false}
        toggleMuteStatus={() => {}}
        onPermalinkClick={() => {}}
    />
);
ClosedForComments.story = {
    name: 'A closed comment on desktop view',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [1300] },
    },
};
