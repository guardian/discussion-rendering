import React from "react";

import { UserDetails } from "./UserDetails";

export default { title: "UserDetails" };

const userProfile = {
  userId: "dfsiubdin",
  displayName: "The facilitator",
  webUrl: "someURL",
  apiUrl: "someURL",
  avatar: "https://avatar.guim.co.uk/user/101256410",
  secureAvatarUrl: "https://avatar.guim.co.uk/user/101256410",
  badge: []
};

export const UserDetailsStory = () => <UserDetails profile={userProfile} />;
