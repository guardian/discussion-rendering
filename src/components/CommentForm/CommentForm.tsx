import React, { useState, useRef } from 'react';
import { css, cx } from 'emotion';

import { palette, space } from '@guardian/src-foundations';
import { neutral, text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

import { simulateNewComment } from '../../lib/simulateNewComment';
import { comment, reply, preview, addUserName } from '../../lib/api';
import { CommentResponse, UserProfile, CommentType, Pillar } from '../../types';

import { FirstCommentWelcome } from '../FirstCommentWelcome/FirstCommentWelcome';
import { Row } from '../Row/Row';
import { PillarButton } from '../PillarButton/PillarButton';

type Props = {
    shortUrl: string;
    pillar: Pillar;
    user: UserProfile;
    onAddComment: (response: CommentType) => void;
    setCommentBeingRepliedTo?: () => void;
    commentBeingRepliedTo?: CommentType;
};

const boldString = (text: string) => `<b>${text}</b>`;
const italicsString = (text: string) => `<i>${text}</i>`;
const quoteString = (text: string) => `<blockquote>${text}</blockquote>`;
const linkStringFunc = (url: string, highlightedText?: string) =>
    `<a href="${url}">${highlightedText ? highlightedText : url}</a>`;

const formWrapper = css`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: ${space[5]}px;
`;

const commentTextArea = css`
    width: 100%;
    margin-bottom: ${space[3]}px;
    padding: 8px 10px 10px 8px;
    ${textSans.small()};
    border-color: ${palette.neutral[86]};
    :focus {
        border-color: ${palette.neutral[46]};
        outline: none;
    }
`;

const greyPlaceholder = css`
    ::placeholder {
        color: ${neutral[46]};
    }
`;

// Opacity? See: https://stackoverflow.com/questions/19621306/css-placeholder-text-color-on-firefox
const blackPlaceholder = css`
    ::placeholder {
        font-weight: bold;
        opacity: 1;
        color: ${neutral[0]};
    }
`;

const arrowSize = 15;
const bg = neutral[93];
const previewStyle = css`
    padding: ${space[2]}px;
    background-color: ${bg};
    border-radius: 5px;
    margin-bottom: ${arrowSize + 5}px;
    position: relative;

    :before {
        content: '';
        position: absolute;
        border-right: ${arrowSize}px solid transparent;
        border-top: ${arrowSize}px solid ${bg};
        bottom: -${arrowSize - 1}px;
    }
`;

const headerTextStyles = css`
    margin: 0;
    ${textSans.xsmall()};
`;

const errorTextStyles = css`
    margin: 0;
    ${textSans.xsmall()};
    color: ${text.error};
`;

const infoTextStyles = css`
    margin: 0;
    ${textSans.xsmall()};
    color: ${text.supporting};
`;

const msgContainerStyles = css`
    margin-top: 8px;
`;

const linkStyles = css`
    a {
        color: ${text.anchorPrimary};
        text-decoration: none;
        :hover,
        :focus {
            text-decoration: underline;
        }
    }
`;

const wrapperHeaderTextStyles = css`
    background-color: ${neutral[97]};
    padding: 8px 10px 10px 8px;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 2px;
`;

const commentAddOns = css`
    height: 22px;
    font-size: 13px;
    line-height: 17px;
    border: 1px solid ${palette.neutral[100]};
    color: ${neutral[46]};
    text-align: center;
    cursor: pointer;
    margin-left: 4px;
    padding: 2px 5px 0px 5px;
    min-width: 11px;
    line-height: 17px;
    list-style-type: none;
`;

const bottomContainer = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: space-between;
`;

const Space = ({ amount }: { amount: 1 | 2 | 3 | 4 | 5 | 6 | 9 | 12 | 24 }) => (
    <div
        className={css`
            width: ${space[amount]}px;
        `}
    />
);

export const CommentForm = ({
    shortUrl,
    pillar,
    onAddComment,
    user,
    setCommentBeingRepliedTo,
    commentBeingRepliedTo,
}: Props) => {
    const [isActive, setIsActive] = useState<boolean>(
        commentBeingRepliedTo ? true : false,
    );
    const [userNameMissing, setUserNameMissing] = useState<boolean>(false);
    const [body, setBody] = useState<string>('');
    const [previewBody, setPreviewBody] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [info, setInfo] = useState<string>('');
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const getHighlightedString = ():
        | {
              highlightedString: string;
              startString: string;
              endString: string;
          }
        | undefined => {
        if (!textAreaRef || !textAreaRef.current) return;
        const selectionStart = textAreaRef.current.selectionStart;
        const selectionEnd = textAreaRef.current.selectionEnd;
        const value = textAreaRef.current.value;

        const startString = value.substring(0, selectionStart);
        const highlightedString = value.substring(selectionStart, selectionEnd);
        const endString = value.substring(selectionEnd, value.length);
        return { startString, highlightedString, endString };
    };

    const transformText = (
        transfromFunc: (highlightedString: string) => string,
    ) => {
        const textAreaStrings = getHighlightedString();
        if (!textAreaStrings) return;
        const { startString, highlightedString, endString } = textAreaStrings;
        setBody(
            startString.concat(transfromFunc(highlightedString), endString),
        );
    };

    const transformLink = () => {
        const url = prompt('Your URL:', 'http://www.');
        if (url === null) return;
        const textAreaStrings = getHighlightedString();
        if (!textAreaStrings) return;
        const { startString, highlightedString, endString } = textAreaStrings;
        setBody(
            startString.concat(
                linkStringFunc(url, highlightedString),
                endString,
            ),
        );
    };

    const fetchShowPreview = async () => {
        if (!body) return;

        try {
            const response = await preview(body);
            setPreviewBody(response);
            setShowPreview(true);
        } catch (e) {
            setError('Preview request failed, please try again');
            setPreviewBody('');
            setShowPreview(false);
        }
    };

    const resetForm = () => {
        setError('');
        setInfo('');
        setBody('');
        setShowPreview(false);
        setIsActive(false);
        setCommentBeingRepliedTo && setCommentBeingRepliedTo();
    };

    const submitForm = async () => {
        setError('');
        setInfo('');

        if (body) {
            const response: CommentResponse = commentBeingRepliedTo
                ? await reply(shortUrl, body, commentBeingRepliedTo.id)
                : await comment(shortUrl, body);

            // Check response message for error states
            if (response.message === 'USERNAME_MISSING') {
                // Reader has never posted before and needs to choose a username
                setUserNameMissing(true);
            } else if (response.message === 'EMPTY_COMMENT_BODY') {
                setError('Please write a comment.');
            } else if (response.message === 'COMMENT_TOO_LONG') {
                setError(
                    'Your comment must be fewer than 5000 characters long.',
                );
            } else if (response.message === 'USER_BANNED') {
                setError(
                    'Commenting has been disabled for this account (<a href="/community-faqs#321a">why?</a>).',
                );
            } else if (response.message === 'IP_THROTTLED') {
                setError(
                    'Commenting has been temporarily blocked for this IP address (<a href="/community-faqs">why?</a>).',
                );
            } else if (response.message === 'DISCUSSION_CLOSED') {
                setError(
                    'Sorry your comment can not be published as the discussion is now closed for comments.',
                );
            } else if (response.message === 'PARENT_COMMENT_MODERATED') {
                setError(
                    'Sorry the comment can not be published as the comment you replied to has been moderated since.',
                );
            } else if (response.message === 'COMMENT_RATE_LIMIT_EXCEEDED') {
                setError(
                    'You can only post one comment every minute. Please try again in a moment.',
                );
            } else if (response.message === 'INVALID_PROTOCOL') {
                setError(`Sorry your comment can not be published as it was not sent over
                  a secure channel. Please report us this issue using the technical issue link
                  in the page footer.`);
            } else if (response.message === 'AUTH_COOKIE_INVALID') {
                setError(
                    'Sorry, your comment was not published as you are no longer signed in. Please sign in and try again.',
                );
            } else if (response.message === 'READ-ONLY-MODE') {
                setError(`Sorry your comment can not currently be published as
                  commenting is undergoing maintenance but will be back shortly. Please try
                  again in a moment.`);
            } else if (response.message === 'API_CORS_BLOCKED') {
                setError(`Could not post due to your internet settings, which might be
                 controlled by your provider. Please contact your administrator
                 or disable any proxy servers or VPNs and try again.`);
            } else if (response.message === 'API_ERROR') {
                setError(`Sorry, there was a problem posting your comment. Please try
                  another browser or network connection.  Reference code `);
            } else if (response.message === 'EMAIL_VERIFIED') {
                setInfo(
                    'Sent. Please check your email to verify your email address. Once verified post your comment.',
                );
            } else if (response.message === 'EMAIL_VERIFIED_FAIL') {
                // TODO: Support resending verification email
                setError(`We are having technical difficulties. Please try again later or
            <a href="#">
            <strong>resend the verification</strong></a>.`);
            } else if (response.message === 'EMAIL_NOT_VALIDATED') {
                // TODO: Support resending verification email
                setError(`Please confirm your email address to comment.<br />
            If you can't find the email, we can
            <a href="#">
            <strong>resend the verification email</strong></a> to your email
            address.`);
            } else if (response.status === 'ok') {
                onAddComment(
                    simulateNewComment(
                        // response.message is the id of the comment that was created on the server
                        // it is returned as a string, so we need to cast to an number to be compatable
                        parseInt(response.message),
                        body,
                        user,
                        commentBeingRepliedTo,
                    ),
                );
                resetForm();
            } else {
                setError('Sorry, there was a problem posting your comment.');
            }
        }
    };

    const submitUserName = async (userName: string) => {
        setError('');
        if (!userName) {
            setError('Username field cannot be empty');
            return;
        }

        const response = await addUserName(userName);
        if (response.status === 'ok') {
            // If we are able to submit userName we should continue with submitting comment
            submitForm();
            setUserNameMissing(false);
        } else {
            response.errors && setError(response.errors[0].message);
        }
    };

    if (userNameMissing && body) {
        return (
            <FirstCommentWelcome
                pillar={pillar}
                body={body}
                error={error}
                submitForm={submitUserName}
                cancelSubmit={() => setUserNameMissing(false)}
            />
        );
    }

    return (
        <>
            <form
                className={formWrapper}
                onSubmit={e => {
                    e.preventDefault();
                    submitForm();
                }}
            >
                {error && (
                    <div className={msgContainerStyles}>
                        <p
                            className={cx(errorTextStyles, linkStyles)}
                            dangerouslySetInnerHTML={{ __html: error }}
                        />
                    </div>
                )}
                {info && (
                    <div className={msgContainerStyles}>
                        <p className={cx(infoTextStyles, linkStyles)}>{info}</p>
                    </div>
                )}
                {isActive && (
                    <div className={wrapperHeaderTextStyles}>
                        <p className={cx(headerTextStyles, linkStyles)}>
                            Please keep comments respectful and abide by the{' '}
                            <a href="/community-standards">
                                community guidelines
                            </a>
                            .
                        </p>

                        {user.privateFields &&
                            user.privateFields.isPremoderated && (
                                <p className={cx(errorTextStyles, linkStyles)}>
                                    Your comments are currently being
                                    pre-moderated (
                                    <a
                                        href="/community-faqs#311"
                                        target="_blank"
                                    >
                                        why?
                                    </a>
                                    )
                                </p>
                            )}
                    </div>
                )}
                <textarea
                    data-testid="comment-input"
                    placeholder={
                        commentBeingRepliedTo || !isActive
                            ? 'Join the discussion'
                            : ''
                    }
                    className={cx(
                        commentTextArea,
                        commentBeingRepliedTo && isActive && greyPlaceholder,
                        !commentBeingRepliedTo && !isActive && blackPlaceholder,
                    )}
                    ref={textAreaRef}
                    style={{ height: isActive ? '132px' : '50px' }}
                    onChange={e => {
                        setBody(e.target.value || '');
                    }}
                    value={body}
                    onFocus={() => setIsActive(true)}
                />
                <div className={bottomContainer}>
                    <Row>
                        <>
                            <PillarButton
                                pillar={pillar}
                                type="submit"
                                linkName="post comment"
                            >
                                Post your comment
                            </PillarButton>
                            {(isActive || body) && (
                                <>
                                    <Space amount={3} />
                                    <PillarButton
                                        pillar={pillar}
                                        onClick={fetchShowPreview}
                                        priority="secondary"
                                        linkName="preview-comment"
                                    >
                                        Preview
                                    </PillarButton>
                                    <Space amount={3} />

                                    <PillarButton
                                        pillar={pillar}
                                        onClick={resetForm}
                                        priority="subdued"
                                        linkName="cancel-post-comment"
                                    >
                                        Cancel
                                    </PillarButton>
                                </>
                            )}
                        </>
                    </Row>
                    {isActive && (
                        <Row>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    transformText(boldString);
                                }}
                                className={commentAddOns}
                                data-link-name="formatting-controls-bold"
                            >
                                B
                            </button>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    transformText(italicsString);
                                }}
                                className={commentAddOns}
                                data-link-name="formatting-controls-italic"
                            >
                                i
                            </button>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    transformText(quoteString);
                                }}
                                className={commentAddOns}
                                data-link-name="formatting-controls-quote"
                            >
                                "
                            </button>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    transformLink();
                                }}
                                className={commentAddOns}
                                data-link-name="formatting-controls-link"
                            >
                                Link
                            </button>
                        </Row>
                    )}
                </div>
            </form>

            {showPreview && (
                <p
                    className={previewStyle}
                    dangerouslySetInnerHTML={{ __html: previewBody || '' }}
                />
            )}
        </>
    );
};
