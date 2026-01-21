import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { className, value, max = 100, showLabel = false, color, size = 'md', ...props },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-4',
    };
    
    return (
      <div ref={ref} className={cn('relative w-full', sizes[size], className)} {...props}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            color || 'bg-primary'
          )}
          style={{ width: `${percentage}%` }}
        />
        {showLabel && (
          <span className="ml-2 text-xs font-medium text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
