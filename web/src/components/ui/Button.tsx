'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      fontWeight: 500,
      borderRadius: 'var(--radius-md)',
      transition: 'all var(--duration-fast) var(--ease-out)',
      whiteSpace: 'nowrap',
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        height: '32px',
        padding: '0 var(--space-3)',
        fontSize: 'var(--text-caption)',
      },
      md: {
        height: '44px',
        padding: '0 var(--space-5)',
        fontSize: 'var(--text-body)',
      },
      lg: {
        height: '56px',
        padding: '0 var(--space-7)',
        fontSize: 'var(--text-body-large)',
      },
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: 'var(--color-primary)',
        color: 'var(--color-text-inverse)',
        border: 'none',
      },
      secondary: {
        background: 'transparent',
        color: 'var(--color-text-primary)',
        border: 'var(--border-width-default) var(--color-border-default)',
      },
      ghost: {
        background: 'transparent',
        color: 'var(--color-text-primary)',
        border: 'none',
      },
      danger: {
        background: 'var(--color-error)',
        color: 'var(--color-text-inverse)',
        border: 'none',
      },
    };

    const hoverStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: 'var(--color-primary-hover)',
      },
      secondary: {
        borderColor: 'var(--color-border-strong)',
        background: 'rgba(255, 255, 255, 0.04)',
      },
      ghost: {
        background: 'rgba(255, 255, 255, 0.08)',
      },
      danger: {
        opacity: 0.9,
      },
    };

    const activeStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: 'var(--color-primary-active)',
      },
      secondary: {
        background: 'rgba(255, 255, 255, 0.08)',
      },
      ghost: {
        background: 'rgba(255, 255, 255, 0.12)',
      },
      danger: {
        opacity: 0.8,
      },
    };

    const focusStyles: React.CSSProperties = {
      outline: '2px solid var(--color-primary)',
      outlineOffset: '2px',
    };

    const [isHovered, setIsHovered] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const currentStyles: React.CSSProperties = {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(isActive ? activeStyles[variant] : isHovered ? hoverStyles[variant] : {}),
      ...(isFocused ? focusStyles : {}),
      opacity: disabled || loading ? 0.5 : 1,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
    };

    return (
      <button
        ref={ref}
        style={currentStyles}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      >
        {loading && (
          <span
            role="status"
            aria-label="Loading"
            style={{
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }}
          />
        )}
        {icon && !loading && icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
