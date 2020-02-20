import React, { useState, useEffect, useRef } from "react";
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

type formData = {
  categoryId: number;
  reason?: string;
  email?: string;
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

const errorMessageStyles = css`
  color: red;
`;

export const Form: React.FC<{
  commentId: number;
  toggleSetShowForm: () => void;
  pillar: Pillar;
}> = ({ commentId, toggleSetShowForm, pillar }) => {
  // We want to listen to keydown events for accessibility
  useEffect(() => {
    const keyListenersMap: { [key: number]: any } = {
      27: toggleSetShowForm,
      9: handleTabKey
    };
    const keyListener = (e: KeyboardEvent) => {
      const listener = keyListenersMap[e.keyCode];
      return listener && listener(e);
    };

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = useRef<HTMLDivElement>(null);
  let firstElement: HTMLSelectElement | null;
  let lastElement: HTMLButtonElement | null;
  // We want to pull out the 1st and last elements of the form, and highlight the 1st element
  useEffect(() => {
    if (!modalRef.current) return;
    firstElement = modalRef.current.querySelector('select[name="category"]');
    lastElement = modalRef.current.querySelector(
      'button[custom-guardian="close-modal"]'
    );
    firstElement && firstElement.focus();
  }, [modalRef]);

  // This function only gets called when a tab key has been pressed
  // we use `e.shiftKey` internally to determin the direction of the highlighting
  const handleTabKey = (e: KeyboardEvent) => {
    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement && firstElement.focus();
      e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement && lastElement.focus();
      e.preventDefault();
    }
  };

  const [formVariables, setFormVariables] = useState<formData>({
    categoryId: 0,
    reason: "",
    email: ""
  });

  const defaultErrorTexts = {
    categoryId: "",
    reason: "",
    email: "",
    response: ""
  };
  const [errors, setErrors] = useState(defaultErrorTexts);
  const onSubmit = async () => {
    const { categoryId, reason, email } = formVariables;
    // Reset error messages
    setErrors(defaultErrorTexts);
    // Error validation
    if (!categoryId) {
      setErrors({
        ...errors,
        categoryId: "You must select a category before submitting"
      });
    }
    const response = await reportAbuse({
      categoryId,
      reason,
      email,
      commentId
    });
    if (response.status !== 200) {
      setErrors({ ...errors, response: response.message });
    } else {
      toggleSetShowForm();
      // TODO: display sucess?
    }
  };

  const labelStylesClass = labelStyles(pillar);
  return (
    <div aria-modal="true" ref={modalRef}>
      <form className={formWrapper} onSubmit={onSubmit}>
        {errors.response && (
          <span className={errorMessageStyles}>{errors.response}</span>
        )}

        <div className={inputWrapper}>
          <label className={labelStylesClass} htmlFor="category">
            Category
          </label>
          <select
            name="categoryId"
            id="category"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormVariables({
                ...formVariables,
                categoryId: Number(e.target.value)
              })
            }
            value={formVariables.categoryId}
          >
            <option value="0">Please select</option>
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
          {errors.categoryId && (
            <span className={errorMessageStyles}>{errors.categoryId}</span>
          )}
        </div>

        <div className={inputWrapper}>
          <label className={labelStylesClass} htmlFor="reason">
            Reason (optional)
          </label>
          <textarea
            name="reason"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormVariables({ ...formVariables, reason: e.target.value })
            }
            value={formVariables.reason}
          ></textarea>
          {errors.reason && (
            <span className={errorMessageStyles}>{errors.reason}</span>
          )}
        </div>

        <div className={inputWrapper}>
          <label className={labelStylesClass} htmlFor="email">
            Email (optional)
          </label>
          <input
            type="email"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormVariables({ ...formVariables, email: e.target.value })
            }
            value={formVariables.email}
          ></input>
          {errors.email && (
            <span className={errorMessageStyles}>{errors.email}</span>
          )}
        </div>

        <div>
          <Button type="submit" size="small">
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
          pillar={pillar}
          commentId={commentId}
        />
      )}
    </div>
  );
};
