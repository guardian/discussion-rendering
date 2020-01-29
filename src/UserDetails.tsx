import React from "react";
import { avatar } from "./Comment";
import { css } from "emotion";
import { space } from "@guardian/src-foundations";

const profileStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${space[2]}px 0;
`;

const textStyles = css`
  padding-left: ${space[3]}px;
`;

export const UserDetails: React.FC = () => {
  return (
    <div className={profileStyles}>
      <img src="https://i.pravatar.cc/300" alt="" className={avatar(36)} />
      <p className={textStyles}>
        You are signed in as <strong>username</strong>
      </p>
    </div>
  );
};
