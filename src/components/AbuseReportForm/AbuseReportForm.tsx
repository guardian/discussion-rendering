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
  const modalRef = useRef<HTMLDivElement>(null);
  // TODO: use ref once forwardRef is implemented @guardian/src-button
  // We want to pull out the 1st and last elements of the form, and highlight the 1st element
  let firstElement: HTMLSelectElement | null = null;
  let lastElement: HTMLButtonElement | null = null;
  useEffect(() => {
    if (!modalRef.current) return;
    firstElement = modalRef.current.querySelector('select[name="categoryId"]');
    lastElement = modalRef.current.querySelector(
      'button[custom-guardian="close-modal"]'
    );
  }, [modalRef]);
  // We want to highlight the 1st element when the modal is open
  useEffect(() => {
    firstElement && firstElement.focus();
  }, [firstElement]);

  // We want to make sure to close the modal when a user clicks away from the modal
  useEffect(() => {
    const closeOnClickAway = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleSetShowForm();
      }
    };
    document.addEventListener("mousedown", closeOnClickAway);
  }, [modalRef, toggleSetShowForm]);

  // We want to listen to keydown events for accessibility
  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        toggleSetShowForm();
      } else if (e.keyCode === 9) {
        // If firstElement or lastElement are not defined, do not continue
        if (!firstElement || !lastElement) return;

        // we use `e.shiftKey` internally to determin the direction of the highlighting
        // using document.activeElement and e.shiftKey we can check what should be the next element to be highlighted
        if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement && firstElement.focus();
          e.preventDefault();
        }

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement && lastElement.focus(); // The shift key is down so loop focus back to the last item
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  });

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
    if (!response.ok) {
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
            // TODO: use ref once forwardRef is implemented @guardian/src-button
            // ref={firstElement}
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
            // TODO: use ref once forwardRef is implemented @guardian/src-button
            // ref={lastElement}
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
