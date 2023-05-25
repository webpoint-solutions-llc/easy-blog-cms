import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * ArrowLeft Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[18px])
 * @returns ArrowLeft JSX SVG Icon
 */
const ArrowLeftIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[18px]' }) => {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.66667 12.6673L2 8.00065M2 8.00065L6.66667 3.33398M2 8.00065L14 8.00065"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
