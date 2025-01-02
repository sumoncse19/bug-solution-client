import type { InputHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  rightLabel?: string;
  inputType?: string;
  labelClass?: string;
  rightLabelClass?: string;
  inputClass?: string;
  placeholderText?: string;
  required?: boolean;
  onClickRightLabel?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      rightLabel,
      type = 'text',
      labelClass,
      rightLabelClass,
      inputClass,
      placeholder,
      required,
      onClickRightLabel,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col justify-start space-y-1 text-sm">
        {label && (
          <label
            className={`flex justify-between text-start text-sm font-medium text-black ${labelClass}`}
          >
            <div>
              {label} {required && <span className="text-[#0F3677]">*</span>}
            </div>
            {rightLabel && (
              <div
                className={`text-[#0F3677] ${rightLabelClass}`}
                onClick={(e) =>
                  onClickRightLabel && onClickRightLabel(e as any)
                }
              >
                {rightLabel}
              </div>
            )}
          </label>
        )}
        <input
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`h-11 rounded-full border ${
            error ? 'border-red-500' : 'border-[#E4EAF0]'
          } px-4 py-3 outline-none ${inputClass}`}
          {...props}
        />
        {error && typeof error === 'string' && (
          <p className="mt-1 pl-5 text-left text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
