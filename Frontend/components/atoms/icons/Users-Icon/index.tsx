import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

/**
 * Users Icon in SVG JSX format
 * @props className: Class of SVG Icon. Default (w-[18px] h-[18px])
 * @props color: color of SVG Icon. Default #262626
 * @returns Users JSX SVG Icon
 */
const UsersIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[18px]' }) => {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 3.26563C9.54971 2.64282 10.354 2.25 11.25 2.25C12.9069 2.25 14.25 3.59315 14.25 5.25C14.25 6.90685 12.9069 8.25 11.25 8.25C10.354 8.25 9.54971 7.85718 9 7.23437M11.25 15.75H2.25V15C2.25 12.5147 4.26472 10.5 6.75 10.5C9.23528 10.5 11.25 12.5147 11.25 15V15.75ZM11.25 15.75H15.75V15C15.75 12.5147 13.7353 10.5 11.25 10.5C10.4304 10.5 9.66189 10.7191 9 11.102M9.75 5.25C9.75 6.90685 8.40685 8.25 6.75 8.25C5.09315 8.25 3.75 6.90685 3.75 5.25C3.75 3.59315 5.09315 2.25 6.75 2.25C8.40685 2.25 9.75 3.59315 9.75 5.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UsersIcon;
