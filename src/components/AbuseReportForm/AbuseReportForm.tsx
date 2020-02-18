import React, { useState, useEffect, createRef } from "react";
import { css } from "emotion";

import { palette } from "@guardian/src-foundations";
import { textSans } from "@guardian/src-foundations/typography";
import { space, neutral } from "@guardian/src-foundations";
import { Button } from "@guardian/src-button";
import { SvgClose } from "@guardian/src-svgs";

import { Pillar } from "../../types";
import { reportAbuse } from "../../lib/api";

type Props = {
  commentId: number;
  pillar: Pillar;
};

const validate = ({ categoryId }: { categoryId: number }) =>
  !categoryId ? { category: errors.category } : null;

const errors = {
  category: "Please select a category"
};

const formWrapper = css`
  z-index: 1;
  border: 1px solid #dcdcdc;
  position: absolute;
  width: 300px;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: ${space[3]}px;
  background-color: white;
  ${textSans.xsmall()};
`;

const labelStyles = (pillar: Pillar) => css`
  color: ${palette[pillar][400]};
  ${textSans.small({ fontWeight: "bold" })}
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

const buttonStyles = css`
  ${textSans.xsmall({ fontWeight: "light" })}
  color: ${palette.neutral[46]};
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  background: transparent;
  :hover {
    text-decoration: underline;
    cursor: pointer;
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
  pillar: Pillar;
}> = ({
  toggleSetShowForm,
  submitForm,
  selectedCategory,
  categoryOnChange,
  reasonOnChange,
  reasonText,
  emailOnChange,
  emailText,
  errors,
  pillar
}) => {
  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    };

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (!modalRef.current) return;
    const closeModal = modalRef.current.querySelector(
      'select[name="category"]'
    );
    closeModal && closeModal.focus();
  }, [modalRef]);

  const handleTabKey = (e: KeyboardEvent) => {
    if (!modalRef.current) return;
    const focusableModalElements = modalRef.current.querySelectorAll(
      'select[name="category"], textarea[name="reason"], input[type="email"], button[type="submit"], button[custom-guardian="close-modal"]'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, toggleSetShowForm],
    [9, handleTabKey]
  ]);

  const labelStylesClass = labelStyles(pillar);
  return (
    <div aria-modal="true" ref={modalRef}>
      <form className={formWrapper}>
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
          <label className={labelStylesClass} htmlFor="category">
            Category
          </label>
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
          <label className={labelStylesClass} htmlFor="reason">
            Reason (optional)
          </label>
          <textarea
            name="reason"
            onChange={reasonOnChange}
            value={reasonText}
          ></textarea>
        </div>

        <div className={inputWrapper}>
          <label className={labelStylesClass} htmlFor="email">
            Email (optional)
          </label>
          <input
            type="email"
            name="email"
            onChange={emailOnChange}
            value={emailText}
          ></input>
        </div>

        <div>
          <Button onClick={submitForm} type="submit" size="small">
            Report
          </Button>
        </div>
        <div
          className={css`
            position: absolute;
            right: ${space[3]}px;
            top: ${space[3]}px;
          `}
        >
          <Button
            custom-guardian="close-modal"
            size="small"
            iconSide="right"
            icon={<SvgClose />}
            onClick={toggleSetShowForm}
          />
        </div>
      </form>
    </div>
  );
};

export const AbuseReportForm: React.FC<{
  commentId: number;
  pillar: Pillar;
}> = ({ commentId, pillar }: Props) => {
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
      <button className={buttonStyles} onClick={toggleSetShowForm}>
        Report
      </button>
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
          pillar={pillar}
        />
      )}
    </div>
  );
};
