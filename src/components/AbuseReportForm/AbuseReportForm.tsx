import React, { useState } from "react";
import { css } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";
import { space, neutral } from "@guardian/src-foundations";
import { Button } from "@guardian/src-button";
import { SvgClose } from "@guardian/src-svgs";

import { reportAbuse } from "../../lib/api";

interface Props {
  commentID: number;
  categoryID?: number;
  reason?: string;
}

const formWrapper = css`
  position: absolute;
  width: 300px;
  padding: ${space[3]}px;
  background-color: white;
  ${textSans.xsmall()};
`;

const inputWrapper = css`
  display: block;
  margin-bottom: ${space[2]}px;

  label {
    display: block;
  }

  select,
  input,
  textarea {
    min-height: ${space[5]}px;
    width: 75%;
    border: 1px solid ${neutral[86]};
  }
`;

export const Form: React.FC<{
  toggleSetShowForm: () => void;
  reportAbuse: () => void;
}> = ({ toggleSetShowForm, reportAbuse }) => (
  <form className={formWrapper}>
    <div
      className={css`
        position: absolute;
        right: ${space[3]}px;
        top: ${space[3]}px;
      `}
    >
      <Button
        size="small"
        iconSide="right"
        icon={<SvgClose />}
        onClick={toggleSetShowForm}
      />
    </div>

    <div className={inputWrapper}>
      <label htmlFor="category">Category</label>
      <select name="category" id="category">
        <option selected value="0">
          Please select
        </option>
        <option value="1">Personal abuse</option>
        <option value="2">Off topic</option>
        <option value="3">Legal issue</option>
        <option value="4">Trolling</option>
        <option value="5">Hate speech</option>
        <option value="6">Offensive/Threatening language</option>
        <option value="7">Copyright</option>
        <option value="8">Spam</option>
        <option value="9">Other</option>
      </select>
    </div>

    <div className={inputWrapper}>
      <label htmlFor="reason">Reason (optional)</label>
      <textarea name="reason"></textarea>
    </div>

    <div className={inputWrapper}>
      <label htmlFor="email">Email (optional)</label>
      <input type="email" name="email"></input>
    </div>

    <div
      className={css`
        float: right;
      `}
    >
      <Button onClick={reportAbuse} type="submit" size="small">
        Report
      </Button>
    </div>
  </form>
);

export const AbuseReportForm: React.FC<Props> = ({
  commentID,
  categoryID,
  reason
}: Props) => {
  const [showForm, setShowForm] = useState(false);
  const toggleSetShowForm = () => setShowForm(!showForm);

  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <button onClick={toggleSetShowForm}>Report</button>
      {showForm && (
        <Form toggleSetShowForm={toggleSetShowForm} reportAbuse={reportAbuse} />
      )}
    </div>
  );
};
