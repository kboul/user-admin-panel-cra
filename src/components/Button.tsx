interface ButtonProps {
  children: React.ReactNode;
  className: string;
  [key: string]: any;
}

export default function Button({
  children,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={`py-2 px-4 rounded text-sm ${className} disabled:bg-save-btn-disabled-bg
      disabled:text-white disabled:border-save-btn-disabled-bg disabled:shadow-none`}
      {...otherProps}>
      {children}
    </button>
  );
}
