import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * PencilAlt Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[19px])
 * @returns PencilAlt JSX SVG Icon
 */
const PencilAltIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[19px]' }) => {
  return (
    <svg className={className} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.3107 3.18934C14.7249 2.60355 13.7751 2.60355 13.1893 3.18934L6.75 9.62868L6.75 11.75H8.87132L15.3107 5.31066C15.8964 4.72487 15.8964 3.77513 15.3107 3.18934Z"
        fill="white"
      />
      <path
        d="M8.25 4.25H4.5C3.67157 4.25 3 4.92158 3 5.75V14C3 14.8284 3.67157 15.5 4.5 15.5H12.75C13.5784 15.5 14.25 14.8284 14.25 14V10.25M13.1893 3.18934C13.7751 2.60355 14.7249 2.60355 15.3107 3.18934C15.8964 3.77513 15.8964 4.72487 15.3107 5.31066L8.87132 11.75H6.75L6.75 9.62868L13.1893 3.18934Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PencilAltIcon;
