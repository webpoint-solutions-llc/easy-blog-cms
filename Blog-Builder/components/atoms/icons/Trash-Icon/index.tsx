import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Trash Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[19px])
 * @returns Trash JSX SVG Icon
 */
const TrashIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[19px]' }) => {
  return (
    <svg className={className} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.25 5.75L13.5995 14.8569C13.5434 15.6418 12.8903 16.25 12.1033 16.25H5.89668C5.10972 16.25 4.45656 15.6418 4.40049 14.8569L3.75 5.75H6.75V3.5C6.75 3.08579 7.08579 2.75 7.5 2.75H10.5C10.9142 2.75 11.25 3.08579 11.25 3.5V5.75H14.25Z"
        fill="white"
      />
      <path
        d="M14.25 5.75L13.5995 14.8569C13.5434 15.6418 12.8903 16.25 12.1033 16.25H5.89668C5.10972 16.25 4.45656 15.6418 4.40049 14.8569L3.75 5.75M7.5 8.75V13.25M10.5 8.75V13.25M11.25 5.75V3.5C11.25 3.08579 10.9142 2.75 10.5 2.75H7.5C7.08579 2.75 6.75 3.08579 6.75 3.5V5.75M3 5.75H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
