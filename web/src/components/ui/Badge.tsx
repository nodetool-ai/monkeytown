'use client';

import React, { CSSProperties } from 'react';

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
  style,
}: BadgeProps) {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: {
      padding: '2px 6px',
      fontSize: 'var(--text-micro)',
    },
    md: {
      padding: '4px 10px',
      fontSize: 'var(--text-caption)',
    },
    lg: {
      padding: '6px 14px',
      fontSize: 'var(--text-body)',
    },
  };

  const variantStyles: Record<string, CSSProperties> = {
    default: {
      background: 'var(--color-bg-elevated)',
      color: 'var(--color-text-primary)',
    },
    success: {
      background: 'rgba(6, 214, 160, 0.15)',
      color: 'var(--color-success)',
    },
    warning: {
      background: 'rgba(255, 209, 102, 0.15)',
      color: 'var(--color-warning)',
    },
    error: {
      background: 'rgba(255, 68, 68, 0.15)',
      color: 'var(--color-error)',
    },
    info: {
      background: 'rgba(17, 138, 178, 0.15)',
      color: 'var(--color-info)',
    },
  };

  const styles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'var(--radius-full)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <span className={className} style={styles} role="status" aria-label={`Status: ${variant}`}>
      {children}
    </span>
  );
}
