import React from "react";
import { avatar } from "../Comment/Comment";
import { css } from "emotion";
import { space } from "@guardian/src-foundations";
import { UserProfile } from "../../lib/api";

const profileStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${space[2]}px 0;
`;

const textStyles = css`
  padding-left: ${space[3]}px;
`;

export const UserDetails: React.FC<{ profile: UserProfile }> = ({
  profile
}) => {
  return (
    <div className={profileStyles}>
      <img
        src={profile.avatar}
        alt="your avatar image"
        className={avatar(36)}
      />
      <p className={textStyles}>
        You are signed in as <strong>{profile.displayName}</strong>
      </p>
    </div>
  );
};
