import { css } from '@emotion/react';
import { neutral, space, textSans } from '@guardian/source-foundations';
import React from 'react';

type Props = {
	previewHtml: string;
};

const previewStyle = css`
	${textSans.small()}
	padding: ${space[2]}px ${space[4]}px;
	background-color: ${neutral[93]};
	border-radius: 5px;
	margin-top: 0;
	margin-bottom: ${20}px;
	word-break: break-word;

	blockquote {
		margin-top: ${space[3]}px;
		margin-bottom: ${space[3]}px;
		margin-left: ${space[5]}px;
		margin-right: ${space[5]}px;
		padding-left: ${space[2]}px;
		color: ${neutral[46]};
	}

	i {
		font-style: italic;
	}

	b {
		font-weight: bold;
	}

	code {
		font-family: monospace;
		font-size: 1em;
	}

	/*
		todo: this spacing is currently repeated here, on regular comments, and
		on TopPick comments; can we factor out the common styling for these
		three components?
	*/
	p {
		margin-top: 0;
		margin-bottom: ${space[3]}px;
	}
`;

const spout = css`
	display: block;
	left: 0;
	width: 0;
	height: 0;
	border-right: 1rem solid transparent;
	border-bottom: 1rem solid ${neutral[93]};
	margin-left: 12.5rem;
	border-right-style: inset;
`;

export const Preview = ({ previewHtml }: Props) => (
	<>
		<div css={spout} />
		<div
			css={previewStyle}
			dangerouslySetInnerHTML={{ __html: previewHtml || '' }}
		/>
	</>
);
