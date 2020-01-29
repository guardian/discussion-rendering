import React, { useState } from "react";
import { css, cx } from "emotion";
import { Button } from "@guardian/src-button";
import { SvgClose } from "@guardian/src-svgs";

interface Props { }

const Form: React.FC<{setShowForm: (value: React.SetStateAction<boolean>) => void}> = ({setShowForm}) => (
  <form>
    <Button size="small" iconSide="right" icon={<SvgClose />} onClick={e => { e.preventDefault(); setShowForm(false) }} />

    <label htmlFor="category">Category</label>
    <select name="category" id="category">
      <option selected value="default">
        Please select{" "}
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

  const preventDefault = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    fn: () => void
  ): void => {
    e.preventDefault();
    fn();
  };

  return (
    <div>
      <a onClick={e => preventDefault(e, () => setShowForm(true))}>Report</a>
      {showForm && <Form setShowForm={setShowForm} />}
    </div>
  );
};
