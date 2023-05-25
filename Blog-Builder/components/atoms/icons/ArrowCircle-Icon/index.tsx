import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

const ArrowCircleIcon: React.FC<IconFunctionType> = ({ className = 'w-8 h-8 text-neutral-900' }) => {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15.5" fill="white" stroke="#262626" />
      <path
        d="M14.6667 20.6673L10 16.0007M10 16.0007L14.6667 11.334M10 16.0007L22 16.0007"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowCircleIcon;
