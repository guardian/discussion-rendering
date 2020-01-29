import React from "react";
import { avatar } from "./Comment";

export const UserDetails: React.FC = () => {
  return (
    <>
      <img src="https://i.pravatar.cc/300" alt="" className={avatar(80)} />
      <p>
        You are signed in as <a href="">Username</a>
      </p>
    </>
  );
};
