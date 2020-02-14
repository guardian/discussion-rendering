import React, { useState } from "react";
import { css } from "emotion";
import { textSans } from "@guardian/src-foundations/typography";
import { space, neutral } from "@guardian/src-foundations";
import { Button } from "@guardian/src-button";
import { SvgClose } from "@guardian/src-svgs";

import { reportAbuse } from "../../lib/api";

type Props = {
  commentId: number;
};

const validate = ({ categoryId }: { categoryId: number }) =>
  !categoryId ? { category: errors.category } : null;

const errors = {
  category: "Please select a category"
};

const formWrapper = css`
  position: absolute;
  width: 300px;
  padding: ${space[3]}px;
  background-color: white;
  ${textSans.xsmall()};
`;

const inputWrapper = css`
  display: flex;
  flex-direction: column;
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
  submitForm: () => void;
  selectedCategory: number;
  categoryOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  reasonOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reasonText?: string;
  emailOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailText?: string;
  errors?: { category?: string; response?: string };
}> = ({
  toggleSetShowForm,
  submitForm,
  selectedCategory,
  categoryOnChange,
  reasonOnChange,
  reasonText,
  emailOnChange,
  emailText,
  errors
}) => (
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

    {errors && errors.response && (
      <span
        className={css`
          color: red;
        `}
      >
        {errors.response}
      </span>
    )}

    <div className={inputWrapper}>
      <label htmlFor="category">Category</label>
      <select
        name="category"
        id="category"
        onChange={categoryOnChange}
        value={selectedCategory}
      >
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
      {errors && errors.category && (
        <span
          className={css`
            color: red;
          `}
        >
          {errors.category}
        </span>
      )}
    </div>

    <div className={inputWrapper}>
      <label htmlFor="reason">Reason (optional)</label>
      <textarea
        name="reason"
        onChange={reasonOnChange}
        value={reasonText}
      ></textarea>
    </div>

    <div className={inputWrapper}>
      <label htmlFor="email">Email (optional)</label>
      <input
        type="email"
        name="email"
        onChange={emailOnChange}
        value={emailText}
      ></input>
    </div>

    <div
      className={css`
        float: right;
      `}
    >
      <Button onClick={submitForm} type="submit" size="small">
        Report
      </Button>
    </div>
  </form>
);

export const AbuseReportForm: React.FC<{
  commentId: number;
}> = ({ commentId }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const toggleSetShowForm = () => setShowForm(!showForm);

  const [errors, setErrors] = useState({});

  const [formState, setFormState] = useState({
    categoryId: 0,
    reason: "",
    email: ""
  });

  const categoryOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setErrors({ ...errors, category: null });
    setFormState({ ...formState, categoryId: Number(event.target.value) });
  };

  const reasonOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormState({ ...formState, reason: event.target.value });

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormState({ ...formState, email: event.target.value });

  const submitForm = async () => {
    const submitErrors = validate({ categoryId: formState.categoryId });
    if (submitErrors) {
      setErrors({ ...errors, category: submitErrors.category });
    } else {
      setErrors({ ...errors, category: null });
      const { status, json } = await reportAbuse({ ...formState, commentId });
      if (status !== 200) {
        setErrors({ ...errors, response: json().message });
      } else {
        toggleSetShowForm();
        // TODO: display sucess?
      }
    }
  };

  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <button onClick={toggleSetShowForm}>Report</button>
      {showForm && (
        <Form
          toggleSetShowForm={toggleSetShowForm}
          submitForm={submitForm}
          categoryOnChange={categoryOnChange}
          selectedCategory={formState.categoryId}
          reasonOnChange={reasonOnChange}
          reasonText={formState.reason}
          emailOnChange={emailOnChange}
          emailText={formState.email}
          errors={errors}
        />
      )}
    </div>
  );
};
