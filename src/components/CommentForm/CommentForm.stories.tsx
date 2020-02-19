import React from "react";
import { CommentForm } from "./CommentForm";

export default { component: CommentForm, title: "CommentForm" };

const shortUrl = "/p/39f5z";
const userProfile = {
  userId: "2762428",
  displayName: "FrankDeFord",
  webUrl: "https://profile.theguardian.com/user/id/2762428",
  apiUrl: "https://discussion.guardianapis.com/discussion-api/profile/2762428",
  avatar: "https://avatar.guim.co.uk/user/2762428",
  secureAvatarUrl: "https://avatar.guim.co.uk/user/2762428",
  badge: []
};

export const Default = () => (
  <CommentForm shortUrl={shortUrl} onAdd={() => {}} user={userProfile} />
);

Default.story = { name: "default" };
