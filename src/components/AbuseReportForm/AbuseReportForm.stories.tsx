import React from "react";
import { css } from "emotion";

import { AbuseReportForm, Form } from "./AbuseReportForm";

export default { title: "Abuse Report Form" };

const wrapperStyles = css`
  padding: 20px;
  height: 300px;
  width: 400px;
  background-color: blue;
  position: absolute;
`;

export const Container = () => (
  <div className={wrapperStyles}>
    <AbuseReportForm commentId={123} pillar={"sport"} />
  </div>
);

export const Dialog = () => (
  <div className={wrapperStyles}>
    <Form
      toggleSetShowForm={() => {}}
      submitForm={() => {}}
      selectedCategory={1}
      categoryOnChange={() => {}}
      reasonOnChange={() => {}}
      reasonText="The best reason"
      emailOnChange={() => {}}
      emailText="bestemail@example.com"
      pillar={"sport"}
    />
  </div>
);

export const DialogWithError = () => (
  <div className={wrapperStyles}>
    <Form
      toggleSetShowForm={() => {}}
      submitForm={() => {}}
      selectedCategory={1}
      categoryOnChange={() => {}}
      reasonOnChange={() => {}}
      reasonText="The best reason"
      emailOnChange={() => {}}
      emailText="bestemail@example.com"
      errors={{ category: "some error" }}
      pillar={"sport"}
    />
  </div>
);
