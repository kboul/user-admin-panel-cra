import { memo, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default memo(function Input({ label, ...otherProps }: InputProps) {
  return (
    <>
      <label className="mb-1 text-sm tracking-wide text-label-color">
        {label}
      </label>
      <input
        className="text-sm placeholder-label-color pl-3 pr-4 rounded-l border border-input-border-color py-2 focus:outline-save-btn-disabled-bg mb-5"
        placeholder={`Enter ${label.toLowerCase()}`}
        {...otherProps}
      />
    </>
  );
});
