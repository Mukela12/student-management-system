import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none';

    const variants = {
      primary:
        'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] focus:ring-primary-300/40 shadow-[0_4px_14px_0_rgba(59,130,246,0.4)]',
      secondary:
        'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200/50 hover:shadow-medium focus:ring-gray-300/40',
      outline:
        'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:shadow-medium focus:ring-primary-300/40',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300/40',
      danger:
        'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] focus:ring-red-300/40 shadow-[0_4px_14px_0_rgba(220,38,38,0.4)]',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-3.5 text-lg',
      xl: 'px-10 py-4 text-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
