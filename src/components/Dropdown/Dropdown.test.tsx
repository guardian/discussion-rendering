import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "@testing-library/react";

import { DropdownOptionType } from "../../types";
import { Dropdown } from "./Dropdown";

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

const noActiveOptions: DropdownOptionType[] = threadOptions.map(option => ({
  ...option,
  isActive: false
}));

describe("Dropdown", () => {
  it("should display the given label", () => {
    const label = "I should show";
    const { getByText } = render(
      <Dropdown
        id="abc"
        pillar="news"
        label={label}
        options={threadOptions}
        onSelect={() => {}}
      />
    );

    expect(getByText(label)).toBeInTheDocument();
  });

  it("should display option titles", () => {
    const { getByText } = render(
      <Dropdown
        id="abc"
        pillar="news"
        label={"The label"}
        options={noActiveOptions}
        onSelect={() => {}}
      />
    );

    expect(getByText(threadOptions[0].title)).toBeInTheDocument();
    expect(getByText(threadOptions[1].title)).toBeInTheDocument();
    expect(getByText(threadOptions[2].title)).toBeInTheDocument();
  });

  it("should render the correct number of options", () => {
    const { container } = render(
      <Dropdown
        id="abc"
        pillar="news"
        label={"The label"}
        options={threadOptions}
        onSelect={() => {}}
      />
    );

    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toEqual(threadOptions.length);
  });

  it("should expand the menu when the label is clicked", () => {
    const { container, getByRole } = render(
      <Dropdown
        id="abc"
        pillar="news"
        label={"The label"}
        options={threadOptions}
        onSelect={() => {}}
      />
    );

    const ulElement = container.querySelector("ul");
    expect(ulElement).toHaveStyle("display: none");
    fireEvent.click(getByRole("button"));
    expect(ulElement).toHaveStyle("display: block");
  });

  it("should close the expanded menu when readers click away", () => {
    const { container, getByRole } = render(
      <Dropdown
        id="abc"
        pillar="news"
        label={"The label"}
        options={threadOptions}
        onSelect={() => {}}
      />
    );

    const ulElement = container.querySelector("ul");
    fireEvent.click(getByRole("button"));
    expect(ulElement).toHaveStyle("display: block");
    container.click();
    expect(ulElement).toHaveStyle("display: none");
  });

  it("should close the expanded menu when blurred", () => {
    const { container, getByRole } = render(
      <Dropdown
        id="abc"
        pillar="news"
        label={"The label"}
        options={threadOptions}
        onSelect={() => {}}
      />
    );

    const ulElement = container.querySelector("ul");
    fireEvent.click(getByRole("button"));
    expect(ulElement).toHaveStyle("display: block");
    fireEvent.keyDown(container, { key: "Escape", code: "Escape" });
    expect(ulElement).toHaveStyle("display: none");
  });
});

it("should trigger the correct onSelect callbacks when an option is clicked", () => {
  const mockCallback = jest.fn();
  const { getByRole, getByText } = render(
    <Dropdown
      id="abc"
      pillar="news"
      label={"The label"}
      options={threadOptions}
      onSelect={mockCallback}
    />
  );

  fireEvent.click(getByRole("button"));
  fireEvent.click(getByText(threadOptions[2].title));
  expect(mockCallback).toHaveBeenCalled();
  expect(mockCallback.mock.calls[0][0]).toBe("unthreaded");
  fireEvent.click(getByRole("button"));
  fireEvent.click(getByText(threadOptions[1].title));
  expect(mockCallback).toHaveBeenCalled();
  expect(mockCallback.mock.calls[1][0]).toBe("expanded");
});
