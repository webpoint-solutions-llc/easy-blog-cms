import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Chat Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[18px])
 * @returns Chat JSX SVG Icon
 */
const ChatIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[18px]' }) => {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.75 6H14.25C15.0784 6 15.75 6.67157 15.75 7.5V12C15.75 12.8284 15.0784 13.5 14.25 13.5H12.75V16.5L9.75 13.5H6.75C6.33579 13.5 5.96079 13.3321 5.68934 13.0607M5.68934 13.0607L8.25 10.5H11.25C12.0784 10.5 12.75 9.82843 12.75 9V4.5C12.75 3.67157 12.0784 3 11.25 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V9C2.25 9.82843 2.92157 10.5 3.75 10.5H5.25V13.5L5.68934 13.0607Z"
        stroke={'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChatIcon;
