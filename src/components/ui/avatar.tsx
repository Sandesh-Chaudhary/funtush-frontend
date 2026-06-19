import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallbackText: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = '', fallbackText, size = 'md', ...props }, ref) => {
    const [hasError, setHasError] = useState(false);

    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
    };

    const getInitials = (text: string) => {
      return text
        .trim()
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'relative flex shrink-0 overflow-hidden rounded-full bg-gray-100 font-medium text-gray-600 items-center justify-center select-none border border-gray-200',
            sizes[size]
          ),
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover aspect-square"
          />
        ) : (
          <span>{getInitials(fallbackText)}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';