import React from "react";
import { Message } from "./Message";

export default { component: Message, title: "Message" };

export const Default = () => <Message />;
Default.story = { name: "default" };
