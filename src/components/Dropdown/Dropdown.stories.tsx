import React from "react";
import { css } from "emotion";

import { DropdownLinkType } from "../../types";
import { Dropdown } from "./Dropdown";

const Header = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      height: 300px;
      width: 100%;
    `}
  >
    {children}
  </div>
);

const Nav = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      height: 20px;
      position: absolute;
      top: 10px;
      display: block;
      right: 258px;
      width: 197px;
      z-index: 1072;
      transform: translateX(100%);
      padding-top: 7px;
    `}
  >
    {children}
  </div>
);

const links: DropdownLinkType[] = [
  {
    value: "collapsed",
    title: "Collapsed",
    isActive: true
  },
  {
    value: "expanded",
    title: "Expanded"
  },
  {
    value: "unthreaded",
    title: "Unthreaded"
  }
];

const linksWithNoneActive = [
  {
    ...links[0],
    isActive: false
  },
  { ...links[1] },
  { ...links[2] }
];

/* tslint:disable */
export default {
  component: Dropdown,
  title: "Dropdown"
};
/* tslint:enable */

export const DropdownActive = () => (
  <Header>
    <Nav>
      <Dropdown
        id="d1"
        label="UK edition"
        links={links}
        onFilterClick={(value: string) => {
          console.log("clicked: ", value);
        }}
      />
    </Nav>
  </Header>
);
DropdownActive.story = { name: "Dropdown with first item active" };

export const DropdownNoActive = () => (
  <Header>
    <Nav>
      <Dropdown
        id="d2"
        label="UK edition"
        links={linksWithNoneActive}
        onFilterClick={(value: string) => {
          console.log("clicked: ", value);
        }}
      />
    </Nav>
  </Header>
);
DropdownNoActive.story = { name: "Dropdown with nothing active" };
