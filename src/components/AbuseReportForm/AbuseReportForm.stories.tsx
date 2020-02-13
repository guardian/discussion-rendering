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
    <AbuseReportForm />
  </div>
);

export const AbuseReportFormDialog = () => (
  <div className={wrapperStyles}>
    <Form toggleSetShowForm={() => {}} />
  </div>
);
