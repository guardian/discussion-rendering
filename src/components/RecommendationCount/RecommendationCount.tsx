import React, { useState } from "react";
import { css } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";
import { palette } from "@guardian/src-foundations";

type Props = {
  commentId: number;
  initialCount: number;
  alreadyRecommended: boolean;
};

const flexStyles = css`
  display: flex;
  flex-direction: row;
`;

const countStyles = css`
  ${textSans.xsmall({ fontWeight: "light" })}
  min-width: 0.75rem;
  color: ${palette.neutral[46]};
  margin-right: 0.3125rem;
`;

const ArrowUp = () => (
  <svg height="14" width="15">
    <path d="M.5 7l5.25-4.5V14h1.5V2.5L12.5 7l.5-1-5.75-6h-1.5L0 6l.5 1z"></path>
  </svg>
);

const buttonStyles = (recommended: Boolean) => css`
  cursor: pointer;
  width: 1.1875rem;
  height: 1.1875rem;
  background-color: ${recommended ? "blue" : "#f6f6f6"};
  border-radius: 62.5rem;
  border: none;
`;

const arrowStyles = css`
  margin-left: -4px;
  margin-bottom: -2px;
  svg {
    fill: ${palette.neutral[46]};
  }
`;

export const RecommendationCount = ({
  commentId,
  initialCount,
  alreadyRecommended
}: Props) => {
  const [count, setCount] = useState(initialCount);
  const [recommended, setRecommended] = useState(alreadyRecommended);

  const recommend = () => {
    const newCount = count + 1;
    setCount(newCount);
    setRecommended(true);

    //makeApi call
    fetch(
      `https://discussion.theguardian.com/discussion-api/comment/${commentId}/recommend`,
      {
        method: "POST"
      }
    ).then(response => {
      if (!response.ok) {
        setCount(newCount - 1);
        setRecommended(alreadyRecommended);
      }
    });
  };

  return (
    <div className={flexStyles}>
      <div className={countStyles}>{count}</div>
      <button className={buttonStyles(recommended)} onClick={() => recommend()}>
        <div className={arrowStyles}>
          <ArrowUp />
        </div>
      </button>
    </div>
  );
};
