import React, { useState } from "react";
import { css } from "emotion";

import { DropdownOptionType } from "../../types";
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

const DropdownParent = () => {
  const [selected, setSelected] = useState<string>();
  const pageSizeOptions: DropdownOptionType[] = [
    {
      value: "25",
      title: "25",
      isActive: selected === "25"
    },
    {
      value: "50",
      title: "50",
      isActive: selected === "50"
    },
    {
      value: "100",
      title: "100",
      isActive: selected === "100"
    }
  ];

  return (
    <Dropdown
      id="d3"
      label="Page Size"
      pillar="culture"
      options={pageSizeOptions}
      onSelect={(value: string) => {
        setSelected(value);
      }}
    />
  );
};

const threadOptions: DropdownOptionType[] = [
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

const optionsWithNoneActive = [
  {
    ...threadOptions[0],
    isActive: false
  },
  { ...threadOptions[1] },
  { ...threadOptions[2] }
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
      pillar="lifestyle"
      label="Threads"
      options={threadOptions}
      onSelect={(value: string) => {
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
      pillar="news"
      options={optionsWithNoneActive}
      onSelect={(value: string) => {
        console.log("clicked: ", value);
      }}
    />
  </Container>
);
DropdownNoActive.story = { name: "Dropdown with nothing active" };

export const DropdownWithState = () => (
  <Container>
    <DropdownParent />
  </Container>
);
DropdownWithState.story = { name: "Dropdown with working selection" };
