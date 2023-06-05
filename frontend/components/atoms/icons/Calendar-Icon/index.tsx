import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Calendar Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[18px])
 * @returns Calendar JSX SVG Icon
 */
const CalendarIcon: React.FC<IconFunctionType> = ({ className = 'w-[20px] h-[21px]' }) => {
  return (
    <svg className={className} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.66667 6.33333V3M13.3333 6.33333V3M5.83333 9.66667H14.1667M4.16667 18H15.8333C16.7538 18 17.5 17.2538 17.5 16.3333V6.33333C17.5 5.41286 16.7538 4.66667 15.8333 4.66667H4.16667C3.24619 4.66667 2.5 5.41286 2.5 6.33333V16.3333C2.5 17.2538 3.24619 18 4.16667 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalendarIcon;
