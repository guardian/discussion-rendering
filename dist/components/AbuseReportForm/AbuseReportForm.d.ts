import React from "react";
export declare const Form: React.FC<{
  toggleSetShowForm: () => void;
  submitForm: () => void;
  selectedCategory: number;
  categoryOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  reasonOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  reasonText?: string;
  emailOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailText?: string;
  errors?: {
    category?: string;
    response?: string;
  };
}>;
export declare const AbuseReportForm: React.FC<{
  commentId: number;
}>;
