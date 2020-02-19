import React from "react";
import { css } from "emotion";

import { AbuseReportForm, Form } from "./AbuseReportForm";

export default { title: "Abuse Report Form" };

const wrapperStyles = css`
  padding: 20px;
  height: 300px;
  width: 400px;
  background-color: blue;
`;

export const AbuseReportFormContainer = () => (
  <div className={wrapperStyles}>
    <AbuseReportForm commentId={123} />
  </div>
);

export const AbuseReportFormDialog = () => (
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
    />
  </div>
);
export const AbuseReportFormDialogWithError = () => (
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
    />
  </div>
);
