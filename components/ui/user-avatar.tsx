import * as React from 'react';
import { cn, getInitials } from '@/lib/utils';

interface UserAvatarProps {
  username: string;
  color?: string;
  size?: number;
  className?: string;
}

const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ username, color = '#6366f1', size = 40, className }, ref) => {
    const initials = getInitials(username);
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-full font-bold text-white',
          className
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          fontSize: `${size / 2.5}px`,
        }}
      >
        {initials}
      </div>
    );
  }
);

UserAvatar.displayName = 'UserAvatar';

export { UserAvatar };
