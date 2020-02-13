import React, { useState } from "react";
import { css, cx } from "emotion";

import { space } from "@guardian/src-foundations";
import { Button } from "@guardian/src-button";
import { SvgClose } from "@guardian/src-svgs";

interface Props {}

export const Form: React.FC<{
  toggleSetShowForm: () => void;
}> = ({ toggleSetShowForm }) => (
  <form
    className={css`
      position: absolute;
      width: 300px;
      padding: ${space[3]}px;
      background-color: white;
    `}
  >
    <Button
      size="small"
      iconSide="right"
      icon={<SvgClose />}
      onClick={toggleSetShowForm}
    />

    <label htmlFor="category">Category</label>
    <select name="category" id="category">
      <option selected value="default">
        Please select
      </option>
      <option value="personalAbuse">Personal abuse</option>
      <option value="offTopic">Off topic</option>
    </select>

    <label htmlFor="reason">Reason (optional)</label>
    <textarea name="reason"></textarea>

    <label htmlFor="email">Email (optional)</label>
    <input type="email" name="email"></input>

    <Button type="submit" size="small">
      Report
    </Button>
  </form>
);

export const AbuseReportForm: React.FC<Props> = ({}: Props) => {
  const [showForm, setShowForm] = useState(false);
  const toggleSetShowForm = () => setShowForm(!showForm);

  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <button onClick={toggleSetShowForm}>Report</button>
      {showForm && <Form toggleSetShowForm={toggleSetShowForm} />}
    </div>
  );
};
