import { joinUrl } from './joinUrl';

import {
    OrderByType,
    ThreadsType,
    DiscussionResponse,
    DiscussionOptions,
    UserProfile,
    CommentType,
    CommentResponse,
    UserNameResponse,
    AdditionalHeadersType,
} from '../types';

let options = {
    // Defaults
    baseUrl: 'https://discussion.theguardian.com/discussion-api',
    headers: {},
};

export const initialiseApi = ({
    baseUrl,
    additionalHeaders,
}: {
    baseUrl: string;
    additionalHeaders: AdditionalHeadersType;
}) => {
    options.baseUrl = baseUrl;
    options.headers = additionalHeaders;
};

const objAsParams = (obj: any): string => {
    const params = Object.keys(obj)
        .map(key => {
            return `${key}=${obj[key]}`; // type issues here cannot be avoided
        })
        .join('&');

    return '?' + params;
};

export const getDiscussion = (
    shortUrl: string,
    opts: {
        orderBy: OrderByType;
        pageSize: number;
        threads: ThreadsType;
        page: number;
    },
): Promise<DiscussionResponse> => {
    const apiOpts: DiscussionOptions = {
        // Frontend uses the 'recommendations' key to store this options but the api expects
        // 'mostRecommended' so we have to map here to support both
        orderBy:
            opts.orderBy === 'recommendations'
                ? 'mostRecommended'
                : opts.orderBy,
        pageSize: opts.pageSize,
        displayThreaded: opts.threads !== 'unthreaded',
        maxResponses: opts.threads === 'collapsed' ? 3 : 100,
        page: opts.page,
    };
    const params = objAsParams(apiOpts);

    const url = joinUrl([options.baseUrl, 'discussion', shortUrl]) + params;

    return fetch(url, {
        headers: {
            ...options.headers,
        },
    })
        .then(resp => resp.json())
        .catch(error => console.error(`Error fetching ${url}`, error));
};

export const preview = (body: string): Promise<string> => {
    const url = joinUrl([options.baseUrl, 'comment/preview']);
    const data = new URLSearchParams();
    data.append('body', body);

    return fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options.headers,
        },
    })
        .then(resp => resp.json())
        .then(json => json.commentBody)
        .catch(error => console.error(`Error fetching ${url}`, error));
};

export const getProfile = (): Promise<UserProfile> => {
    const url = joinUrl([options.baseUrl, 'profile/me']);

    return fetch(url, {
        credentials: 'include',
        headers: {
            ...options.headers,
        },
    })
        .then(resp => resp.json())
        .catch(error => console.error(`Error fetching ${url}`, error));
};

export const comment = (
    shortUrl: string,
    body: string,
): Promise<CommentResponse> => {
    const url = joinUrl([options.baseUrl, 'discussion', shortUrl, 'comment']);
    const data = new URLSearchParams();
    data.append('body', body);

    return fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options.headers,
        },
        credentials: 'include',
    }).then(resp => resp.json());
};

export const reply = (
    shortUrl: string,
    body: string,
    parentCommentId: number,
): Promise<CommentResponse> => {
    const url = joinUrl([
        options.baseUrl,
        'discussion',
        shortUrl,
        'comment',
        parentCommentId.toString(),
        'reply',
    ]);
    const data = new URLSearchParams();
    data.append('body', body);

    return fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options.headers,
        },
        credentials: 'include',
    }).then(resp => resp.json());
};

export const getPicks = (shortUrl: string): Promise<CommentType[]> => {
    const url = joinUrl([
        options.baseUrl,
        'discussion',
        shortUrl,
        'topcomments',
    ]);

    return fetch(url, {
        headers: {
            ...options.headers,
        },
    })
        .then(resp => resp.json())
        .then(json => json.discussion.comments)
        .catch(error => console.error(`Error fetching ${url}`, error));
};

export const reportAbuse = ({
    commentId,
    categoryId,
    email,
    reason,
}: {
    commentId: number;
    categoryId: number;
    reason?: string;
    email?: string;
}) => {
    const url = options.baseUrl + `/comment/${commentId}/reportAbuse`;

    const data = new URLSearchParams();
    data.append('categoryId', categoryId.toString());
    email && data.append('email', email.toString());
    reason && data.append('reason', reason);

    return fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options.headers,
        },
    }).then(resp => resp.json());
};

export const recommend = (commentId: number): Promise<boolean> => {
    const url = joinUrl([
        options.baseUrl,
        'comment',
        commentId.toString(),
        'recommend',
    ]);

    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            ...options.headers,
        },
    }).then(resp => resp.ok);
};

export const addUserName = (userName: string): Promise<UserNameResponse> => {
    const url = 'https://idapi.theguardian.com/user/me';
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            publicFields: {
                username: userName,
                displayName: userName,
            },
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(resp => resp.json())
        .catch(error => console.error(`Error fetching ${url}`, error));
};

export const pickComment = (commentId: number): Promise<CommentResponse> => {
    const url = joinUrl([
        options.baseUrl,
        'comment',
        commentId.toString(),
        'highlight',
    ]);

    return fetch(url, {
        method: 'POST',
        headers: {
            ...options.headers,
        },
    })
        .then(resp => resp.json())
        .catch(error => console.error(`Error fetching ${url}`, error));
};

export const unPickComment = (commentId: number): Promise<CommentResponse> => {
    const url = joinUrl([
        options.baseUrl,
        'comment',
        commentId.toString(),
        'unhighlight',
    ]);

    return fetch(url, {
        method: 'POST',
        headers: {
            ...options.headers,
        },
    })
        .then(resp => resp.json())
        .catch(error => console.error(`Error fetching ${url}`, error));
};

export const getMoreResponses = (
    commentId: number,
): Promise<{
    status: 'ok' | 'error';
    comment: CommentType;
}> => {
    const url =
        joinUrl([options.baseUrl, 'comment', commentId.toString()]) +
        '?displayThreaded=true&displayResponses=true';

    return fetch(url, {
        headers: {
            ...options.headers,
        },
    })
        .then(resp => resp.json())
        .catch(error => console.error(`Error fetching ${url}`, error));
};
