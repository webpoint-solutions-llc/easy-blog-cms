import React from 'react';

import { IconFunctionType } from '../iconFunctionType.interface';

const PaperAirPlaneIcon: React.FC<IconFunctionType> = ({ className = 'w-6 text-neutral-500' }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PaperAirPlaneIcon;
