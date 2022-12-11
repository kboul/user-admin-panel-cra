interface InputProps {
  label: string;
  [key: string]: any;
}

export default function Input({ label, ...otherProps }: InputProps) {
  return (
    <>
      <label className="mb-1 text-sm tracking-wide text-label-color">
        {label}
      </label>
      <input
        className="text-sm placeholder-label-color pl-3 pr-4 rounded-l border border-input-border-color py-2 focus:outline-none mb-5"
        placeholder={`Enter ${label.toLowerCase()}`}
        {...otherProps}
      />
    </>
  );
}
