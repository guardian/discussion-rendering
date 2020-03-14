import React from "react";
import { css } from "emotion";

import { DropdownLinkType } from "../../types";
import { Dropdown } from "./Dropdown";

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className={css`
      padding: 10px;
    `}
  >
    {children}
  </div>
);

const threadLinks: DropdownLinkType[] = [
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
    ...threadLinks[0],
    isActive: false
  },
  { ...threadLinks[1] },
  { ...threadLinks[2] }
];

/* tslint:disable */
export default {
  component: Dropdown,
  title: "Dropdown"
};
/* tslint:enable */

export const DropdownActive = () => (
  <Container>
    <Dropdown
      id="d1"
      label="Threads"
      links={threadLinks}
      onFilterClick={(value: string) => {
        console.log("clicked: ", value);
      }}
    />
    <p>Hi, I'm some other content we want to overlay</p>
  </Container>
);
DropdownActive.story = { name: "Dropdown with first item active" };

export const DropdownNoActive = () => (
  <Container>
    <Dropdown
      id="d2"
      label="Threads"
      links={linksWithNoneActive}
      onFilterClick={(value: string) => {
        console.log("clicked: ", value);
      }}
    />
  </Container>
);
DropdownNoActive.story = { name: "Dropdown with nothing active" };
