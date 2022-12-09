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
      className={`py-2 px-4 rounded text-sm ${className} disabled:bg-slate-50
       disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none`}
      {...otherProps}>
      {children}
    </button>
  );
}
