import React from 'react';
import { IconFunctionType } from '../iconFunctionType.interface';

const PhotographIcon: React.FC<IconFunctionType> = ({ className = 'w-[18px] text-white' }) => {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 12L6.43934 8.56066C7.02513 7.97487 7.97487 7.97487 8.56066 8.56066L12 12M10.5 10.5L11.6893 9.31066C12.2751 8.72487 13.2249 8.72487 13.8107 9.31066L15 10.5M10.5 6H10.5075M4.5 15H13.5C14.3284 15 15 14.3284 15 13.5V4.5C15 3.67157 14.3284 3 13.5 3H4.5C3.67157 3 3 3.67157 3 4.5V13.5C3 14.3284 3.67157 15 4.5 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PhotographIcon;
