/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';

import { textSans, headline } from '@guardian/src-foundations/typography';
import { space, neutral } from '@guardian/src-foundations';
import { TextInput } from '@guardian/src-text-input';
import { Link } from '@guardian/src-link';
import { Theme } from '@guardian/types';

import { Row } from '../Row/Row';
import { PillarButton } from '../PillarButton/PillarButton';

import { preview as defaultPreview } from '../../lib/api';

type Props = {
	body: string;
	pillar: Theme;
	error?: string;
	submitForm: (userName: string) => void;
	cancelSubmit: () => void;
	onPreview?: (body: string) => Promise<string>;
};

const previewStyle = css`
	padding: ${space[2]}px;
	background-color: ${neutral[93]};
	margin-bottom: ${space[5]}px;
	position: relative;
	min-height: ${space[9]}px;

	/* p is returned by API and this is the only way to apply styles */
	p {
		padding-left: ${space[2]}px;
	}
`;

const textStyling = css`
	${textSans.small()};
`;

const Text = ({
	children,
}: {
	children: string | JSX.Element | JSX.Element[];
}) => <p css={textStyling}>{children}</p>;

export const FirstCommentWelcome = ({
	body,
	pillar,
	error = '',
	submitForm,
	cancelSubmit,
	onPreview,
}: Props) => {
	const [previewBody, setPreviewBody] = useState<string>('');
	const [userName, setUserName] = useState<string>('');

	useEffect(() => {
		const fetchShowPreview = async () => {
			try {
				const preview = onPreview || defaultPreview;
				const response = await preview(body);
				setPreviewBody(response);
			} catch (e) {
				setPreviewBody('');
			}
		};
		fetchShowPreview();
	}, [body, onPreview]);

	return (
		<div
			css={css`
				padding: ${space[2]}px;
			`}
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submitForm(userName);
				}}
			>
				<h3
					css={css`
						${headline.xxsmall({ fontWeight: 'bold' })};
					`}
				>
					Welcome, you’re about to make your first comment!
				</h3>
				<Text>
					Before you post, we’d like to thank you for joining the debate - we’re
					glad you’ve chosen to participate and we value your opinions and
					experiences.
				</Text>
				<Text>
					Please choose your username under which you would like all your
					comments to show up. You can only set your username once.
				</Text>
				<TextInput
					label="Username:"
					supporting="Must be 6-20 characters, letters and/or numbers only, no spaces."
					value={userName}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUserName(e.target.value)
					}
					width={30}
					error={error}
				/>
				<Text>
					<React.Fragment>
						Please keep your posts respectful and abide by the{' '}
						<Link
							href="/community-standards"
							priority="primary"
							subdued={true}
							rel="nofollow"
						>
							<span css={textStyling}>community guidelines</span>
						</Link>
						{` -`} and if you spot a comment you think doesn’t adhere to the
						guidelines, please use the ‘Report’ link next to it to let us know.
					</React.Fragment>
				</Text>
				<Text>
					Please preview your comment below and click ‘post’ when you’re happy
					with it.
				</Text>
				<div
					css={[previewStyle, textStyling]}
					dangerouslySetInnerHTML={{ __html: previewBody || '' }}
				/>
				<Row>
					<PillarButton
						pillar={pillar}
						onClick={() => submitForm(userName)}
						linkName="post comment"
						size="small"
					>
						Post your comment
					</PillarButton>
					<div
						css={css`
							width: ${space[3]}px;
						`}
					></div>
					<PillarButton
						pillar={pillar}
						priority="subdued"
						onClick={cancelSubmit}
						linkName="cancel-post-comment"
						size="small"
					>
						Cancel
					</PillarButton>
				</Row>
			</form>
		</div>
	);
};
