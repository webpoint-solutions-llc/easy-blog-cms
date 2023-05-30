import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Refresh Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[19px])
 * @returns Refresh JSX SVG Icon
 */
const RefreshIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[19px]' }) => {
  return (
    <svg className={className} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3.5V7.25H3.43614M14.9536 8.75C14.5845 5.79027 12.0597 3.5 9 3.5C6.48197 3.5 4.32622 5.05113 3.43614 7.25M3.43614 7.25H6.75M15 15.5V11.75H14.5639M14.5639 11.75C13.6738 13.9489 11.518 15.5 9 15.5C5.94029 15.5 3.41549 13.2097 3.04642 10.25M14.5639 11.75H11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RefreshIcon;
