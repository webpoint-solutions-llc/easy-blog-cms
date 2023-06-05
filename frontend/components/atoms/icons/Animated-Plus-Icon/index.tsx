import { FC } from 'react';

import clsx from 'clsx';

const AnimatedPlusIcon: FC<{ color?: string; className?: string; iconClass: string }> = ({
  color = '#262626',
  className,
  iconClass,
}) => {
  return (
    <svg
      className={clsx(className ? className : 'w-4 lg:w-5')}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.8008 1.7998V20.1998" stroke={color} className={iconClass} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 11L1.6 11" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

export default AnimatedPlusIcon;
