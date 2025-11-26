import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      fullWidth = true,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const actualType = showPasswordToggle && showPassword ? 'text' : type;

    const baseStyles =
      'px-5 py-3.5 border rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';

    const stateStyles = error
      ? 'border-red-300 focus:border-red-400 focus:ring-red-300/20'
      : success
      ? 'border-green-300 focus:border-green-400 focus:ring-green-300/20'
      : 'border-gray-200 focus:border-primary-400 focus:ring-primary-300/20';

    const inputClasses = cn(
      baseStyles,
      stateStyles,
      leftIcon && 'pl-12',
      (rightIcon || showPasswordToggle || error || success) && 'pr-12',
      fullWidth && 'w-full',
      className
    );

    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            className={inputClasses}
            disabled={disabled}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {error && (
              <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
            )}
            {success && !error && (
              <CheckCircle2 className="h-5 w-5 text-green-500" aria-hidden="true" />
            )}
            {showPasswordToggle && !error && !success && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}
            {rightIcon && !showPasswordToggle && !error && !success && (
              <span className="text-gray-400">{rightIcon}</span>
            )}
          </div>
        </div>

        {/* Helper text, error, or success message */}
        {(error || success || helperText) && (
          <p
            className={cn(
              'mt-2 text-sm',
              error && 'text-red-600',
              success && 'text-green-600',
              !error && !success && 'text-gray-600'
            )}
          >
            {error || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
