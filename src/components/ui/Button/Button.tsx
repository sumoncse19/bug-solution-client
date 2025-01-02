/* eslint-disable react/button-has-type */
import type { ButtonHTMLAttributes } from 'react';
import React from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  type = 'button',
  isDisabled = false,
  ...props
}) => {
  return (
    <button
      type={type || 'button'}
      className={`rounded-full ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
