import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const ChatAltIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] h-[19px] text-neutral-900' }) => {
  return (
    <svg className={className} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.25 5C2.25 4.17157 2.92157 3.5 3.75 3.5H14.25C15.0784 3.5 15.75 4.17157 15.75 5V11C15.75 11.8284 15.0784 12.5 14.25 12.5H10.5L6.75 16.25V12.5H3.75C2.92157 12.5 2.25 11.8284 2.25 11V5Z"
        fill="white"
      />
      <path
        d="M6 8H6.0075M9 8H9.0075M12 8H12.0075M6.75 12.5H3.75C2.92157 12.5 2.25 11.8284 2.25 11V5C2.25 4.17157 2.92157 3.5 3.75 3.5H14.25C15.0784 3.5 15.75 4.17157 15.75 5V11C15.75 11.8284 15.0784 12.5 14.25 12.5H10.5L6.75 16.25V12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChatAltIcon;
