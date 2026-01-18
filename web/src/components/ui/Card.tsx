'use client';

import React, { ReactNode, CSSProperties } from 'react';

export interface CardProps {
  variant?: 'default' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

const paddingStyles: Record<string, string> = {
  none: '0',
  sm: 'var(--space-3)',
  md: 'var(--space-4)',
  lg: 'var(--space-6)',
};

export function Card({
  variant = 'default',
  padding = 'md',
  children,
  onClick,
  className,
  style,
}: CardProps) {
  const baseStyles: CSSProperties = {
    background: 'var(--color-bg-surface)',
    border: 'var(--border-width-hairline) var(--color-border-subtle)',
    borderRadius: 'var(--radius-lg)',
    padding: paddingStyles[padding],
    transition: 'all var(--duration-fast) var(--ease-out)',
  };

  const variantStyles: Record<string, CSSProperties> = {
    default: {},
    elevated: {
      boxShadow: 'var(--shadow-md)',
    },
    interactive: {
      cursor: 'pointer',
    },
  };

  const interactiveHoverStyles: CSSProperties = onClick ? {
    transform: 'translateY(-2px)',
    borderColor: 'var(--color-border-default)',
    boxShadow: 'var(--shadow-md)',
  } : {};

  const [isHovered, setIsHovered] = React.useState(false);

  const combinedStyles: CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...(variant === 'interactive' && isHovered ? interactiveHoverStyles : {}),
    ...style,
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={className}
      style={combinedStyles as any}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={onClick ? undefined : undefined}
      aria-disabled={onClick ? undefined : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? undefined : undefined}
    >
      {children}
    </Component>
  );
}
