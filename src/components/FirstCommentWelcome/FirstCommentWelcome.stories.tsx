import React from "react";

import { FirstCommentWelcome } from "./FirstCommentWelcome";

export default { title: "FirstCommentWelcome" };

export const defaultStory = () => (
  <FirstCommentWelcome
    body="My first message ever!!"
    submitForm={() => {}}
    cancelSubmit={() => {}}
  />
);
defaultStory.story = { name: "Welcome message" };

export const CommentWithError = () => (
  <FirstCommentWelcome
    body="My first message ever!!"
    error="This is a custom user name error message"
    submitForm={() => {}}
    cancelSubmit={() => {}}
  />
);
CommentWithError.story = {
  name: "Welcome message with error"
};
