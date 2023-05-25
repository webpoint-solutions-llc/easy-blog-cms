import React from 'react';

import clsx from 'clsx';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * GreenCheck Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-3 lg:w-5)
 * @props color: color of SVG Icon. Default #262626
 * @returns Eye JSX SVG Icon
 */
const GreenCheckIcon: React.FC<IconFunctionType> = ({ className = 'w-[19px] h-[18px]' }) => {
  return (
    <svg className={className} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.34375" cy="9" r="9" fill="#4CE0B3" />
      <path
        d="M6.34375 9.46875L8.21875 11.3438L12.9062 6.65625"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GreenCheckIcon;
