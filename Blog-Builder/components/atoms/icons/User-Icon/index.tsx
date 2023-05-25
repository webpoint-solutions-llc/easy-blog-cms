import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * User Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[32px] h-[32px])
 * @returns User JSX SVG Icon
 */
const UserIcon: React.FC<IconFunctionType> = ({ className = 'w-[32px] h-[32px] text-neutral-600' }) => {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.3307 9.33333C21.3307 12.2789 18.9429 14.6667 15.9974 14.6667C13.0519 14.6667 10.6641 12.2789 10.6641 9.33333C10.6641 6.38781 13.0519 4 15.9974 4C18.9429 4 21.3307 6.38781 21.3307 9.33333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9974 18.6667C10.8427 18.6667 6.66406 22.8453 6.66406 28H25.3307C25.3307 22.8453 21.1521 18.6667 15.9974 18.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
