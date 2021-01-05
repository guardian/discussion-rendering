export const enum Pillar {
	News = 0,
	Opinion = 1,
	Sport = 2,
	Culture = 3,
	Lifestyle = 4,
	Labs = 5,
}

export type CAPIPillar =
	| 'news'
	| 'sport'
	| 'culture'
	| 'opinion'
	| 'lifestyle'
	| 'labs';

export interface CommentType {
	id: number;
	body: string;
	date: string;
	isoDateTime: string;
	status: string;
	webUrl: string;
	apiUrl: string;
	numResponses?: number;
	numRecommends: number;
	isHighlighted: boolean;
	userProfile: UserProfile;
	responseTo?: {
		displayName: string;
		commentApiUrl: string;
		isoDateTime: string;
		date: string;
		commentId: string;
		commentWebUrl: string;
	};
	responses?: CommentType[];
	metaData?: {
		commentCount: number;
		staffCommenterCount: number;
		editorsPickCount: number;
		blockedCount: number;
		responseCount: number;
	};
	discussion?: {
		key: string;
		webUrl: string;
		apiUrl: string;
		title: string;
		isClosedForComments: boolean;
		isClosedForRecommendation: boolean;
	};
}

export type CommentResponse = {
	status: 'ok' | 'error';
	statusCode: number;
	message: string;
	errorCode?: string;
};

type UserNameError = {
	message: string;
	description: string;
	context: string;
};

type UserConsents = {
	id: string;
	actor: string;
	version: number;
	consented: boolean;
	timestamp: string;
	privacyPolicyVersion: number;
};

type UserGroups = {
	path: string;
	packageCode: string;
};

type UserNameUser = {
	dates: { accountCreatedDate: string };
	consents: UserConsents[];
	userGroups: UserGroups[];
	publicFields: {
		username: string;
		displayName: string;
	};
	statusFields: {
		userEmailValidated: boolean;
		allowThirdPartyProfiling: boolean;
	};
	privateFields: {
		brazeUuid: string;
		legacyPackages: string;
		legacyProducts: string;
	};
	primaryEmailAddress: string;
	id: string;
	hasPassword: boolean;
};

export type UserNameResponse = {
	status: 'ok' | 'error';
	user: UserNameUser;
	errors?: UserNameError[];
};

export type OrderByType = 'newest' | 'oldest' | 'recommendations';
export type ThreadsType = 'collapsed' | 'expanded' | 'unthreaded';
export type PageSizeType = 25 | 50 | 100;
export interface FilterOptions {
	orderBy: OrderByType;
	pageSize: PageSizeType;
	threads: ThreadsType;
}

export interface UserProfile {
	userId: string;
	displayName: string;
	webUrl: string;
	apiUrl: string;
	avatar: string;
	secureAvatarUrl: string;
	badge: any[];

	// only included from /profile/me endpoint
	privateFields?: {
		canPostComment: boolean;
		isPremoderated: boolean;
		hasCommented: boolean;
	};
}

export interface DiscussionResponse {
	status: string;
	errorCode?: string;
	page: number;
	pages: number;
	pageSize: number;
	orderBy: string;
	discussion: {
		key: string;
		webUrl: string;
		apiUrl: string;
		commentCount: number;
		topLevelCommentCount: number;
		isClosedForComments: boolean;
		isClosedForRecommendation: boolean;
		isThreaded: boolean;
		title: string;
		comments: CommentType[];
	};
}

export interface DiscussionOptions {
	orderBy: string;
	pageSize: number;
	displayThreaded: boolean;
	maxResponses: number;
	page: number;
	'api-key': string;
}

export type AdditionalHeadersType = { [key: string]: string };

export type DropdownOptionType = {
	value: string;
	title: string;
	disabled?: boolean;
	isActive?: boolean;
};
